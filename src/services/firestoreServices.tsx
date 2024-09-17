import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import {
  BookmarkedRecipes,
  Newsletter,
  RecipeRating,
} from "../types/documentTypes";

type DocumentData = Newsletter | BookmarkedRecipes | RecipeRating;

export const addDocument = async (
  collectionName: string,
  data: DocumentData
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Error adding document");
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
