import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import {
  BookmarkedRecipes,
  NewComment,
  Newsletter,
  RecipeRating,
} from "../types/documentTypes";

type DocumentData = Newsletter | BookmarkedRecipes | RecipeRating | NewComment;
type FirestoreFieldValue =
  | string
  | number
  | boolean
  | Date
  | null
  | Array<unknown>
  | Record<string, unknown>;

export interface CategoryWithImage {
  name: string;
  imageUrl: string;
}

export const addDocument = async (
  collectionName: string,
  data: DocumentData,
  docPath?: string
): Promise<string> => {
  try {
    let collectionRef;

    if (docPath) {
      const segments = docPath.split("/");

      if (segments.length % 2 !== 0) {
        throw new Error(
          "Invalid document path: must have an even number of segments (alternating collection/document)."
        );
      }
      const parentDocRef = doc(db, ...segments);
      collectionRef = collection(parentDocRef, collectionName);
    } else {
      collectionRef = collection(db, collectionName);
    }

    const docRef = await addDoc(collectionRef, data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw new Error("Error adding document: " + error);
  }
};

export const getDocuments = async <T,>(
  collectionName: string,
  pageSize: number,
  currentPage: number
): Promise<{ data: T[]; totalDocs: number }> => {
  try {
    const collectionRef = collection(db, collectionName);

    const totalCountSnapshot = await getCountFromServer(collectionRef);
    const totalDocs = totalCountSnapshot.data().count;

    const docsQuery = query(collectionRef, limit(pageSize));

    let querySnapshot;
    if (currentPage > 1) {
      const previousPageQuery = query(
        collectionRef,
        limit((currentPage - 1) * pageSize)
      );
      const previousPageSnapshot = await getDocs(previousPageQuery);
      const lastVisibleDoc =
        previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];

      if (lastVisibleDoc) {
        const nextQuery = query(
          collectionRef,
          startAfter(lastVisibleDoc),
          limit(pageSize)
        );
        querySnapshot = await getDocs(nextQuery);
      } else {
        throw new Error("No previous document found for pagination");
      }
    } else {
      querySnapshot = await getDocs(docsQuery);
    }

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as T),
    }));

    return { data, totalDocs };
  } catch (e) {
    throw new Error("Error fetching documents");
  }
};

export const getDocumentById = async <T,>(
  collectionName: string,
  documentId: string
): Promise<T | null> => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      return {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      } as T;
    } else {
      throw new Error("Error getting document by ID");
    }
  } catch (e) {
    throw new Error("Error getting document by ID");
  }
};

export const getDocumentsByField = async <T,>(
  collectionName: string,
  fieldName: string,
  fieldValue: string | number
): Promise<T[]> => {
  try {
    const q = query(
      collection(db, collectionName),
      where(fieldName, "==", fieldValue)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  } catch (e) {
    console.error("Error getting documents by field", e);
    return [];
  }
};

export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    console.log("Document deleted with ID: ", docId);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

export const updateDocumentField = async (
  collectionPath: string,
  docId: string,
  updatedFields: Record<string, FirestoreFieldValue>
) => {
  try {
    const documentRef = doc(db, `${collectionPath}`, docId);
    await updateDoc(documentRef, updatedFields);
  } catch (error) {
    throw new Error("Error updating document fields");
  }
};
