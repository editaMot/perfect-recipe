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
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import {
  BookmarkedRecipes,
  Newsletter,
  RecipeRating,
} from "../types/documentTypes";

type DocumentData = Newsletter | BookmarkedRecipes | RecipeRating;

export interface CategoryWithImage {
  name: string;
  imageUrl: string;
}

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
  pageSize: number = 10,
  currentPage: number = 1,
  fieldName: string = "",
  selectedTags: string[] = []
): Promise<{ data: T[]; totalDocs: number }> => {
  try {
    const collectionRef = collection(db, collectionName);

    let countQuery;
    if (selectedTags.length > 0) {
      countQuery = query(
        collectionRef,
        where(fieldName, "array-contains-any", selectedTags)
      );
    } else {
      countQuery = collectionRef;
    }

    const totalCountSnapshot = await getCountFromServer(countQuery);
    const totalDocs = totalCountSnapshot.data().count;

    let docsQuery = query(collectionRef, limit(pageSize));

    if (selectedTags.length > 0) {
      docsQuery = query(
        collectionRef,
        where(fieldName, "array-contains-any", selectedTags),
        limit(pageSize)
      );
    } else {
      docsQuery = query(collectionRef, limit(pageSize));
    }

    let querySnapshot;
    if (currentPage > 1) {
      const previousPageQuery = query(
        collectionRef,
        ...(selectedTags.length > 0
          ? [where(fieldName, "array-contains-any", selectedTags)]
          : []),
        limit((currentPage - 1) * pageSize)
      );
      const previousPageSnapshot = await getDocs(previousPageQuery);
      const lastVisibleDoc =
        previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];

      if (lastVisibleDoc) {
        const nextQuery = query(
          collectionRef,
          ...(selectedTags.length > 0
            ? [where(fieldName, "array-contains-any", selectedTags)]
            : []),
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

export const getUniqueCategories = async (
  collectionName: string
): Promise<CategoryWithImage[]> => {
  try {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);

    const categoryImagesMap: Map<string, string[]> = new Map();

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const categories = data["categories"] || [];
      const imageUrl = data.image || "";

      categories.forEach((category: string) => {
        if (!categoryImagesMap.has(category)) {
          categoryImagesMap.set(category, []);
        }
        categoryImagesMap.get(category)?.push(imageUrl);
      });
    });

    const categoriesWithImages: CategoryWithImage[] = Array.from(
      categoryImagesMap,
      ([name, imageUrls]) => {
        const randomImageUrl =
          imageUrls[Math.floor(Math.random() * imageUrls.length)];
        return { name, imageUrl: randomImageUrl };
      }
    );

    return categoriesWithImages;
  } catch (e) {
    throw new Error("Error fetching unique values from categories");
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
