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
  BookmarkRecipe,
  NewComment,
  Newsletter,
  RecipeRating,
  Comment,
} from "../types/documentTypes";

type DocumentData = Newsletter | BookmarkRecipe | RecipeRating | NewComment;

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
  pageSize: number | null = 10,
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

    let docsQuery;
    if (pageSize) {
      if (selectedTags.length > 0) {
        docsQuery = query(
          collectionRef,
          where(fieldName, "array-contains-any", selectedTags),
          limit(pageSize)
        );
      } else {
        docsQuery = query(collectionRef, limit(pageSize));
      }
    } else {
      docsQuery = query(collectionRef);
    }

    let querySnapshot;
    if (currentPage > 1 && pageSize) {
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
  } catch {
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
      const categories = data["categories"] ?? [];
      const imageUrl = data?.image ?? "";

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

export const getCommentsForRecipe = async (recipeId: string) => {
  try {
    const commentsRef = collection(db, `recipes/${recipeId}/comments`);
    const commentsQuery = query(commentsRef);
    const querySnapshot = await getDocs(commentsQuery);
    const comments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Comment[];

    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const repliesRef = collection(
          db,
          `recipes/${recipeId}/comments/${comment.id}/replies`
        );
        const repliesQuery = query(repliesRef);
        const repliesSnapshot = await getDocs(repliesQuery);
        const replies = repliesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Comment[];
        return {
          ...comment,
          replies,
        };
      })
    );

    return commentsWithReplies;
  } catch (e) {
    throw new Error("Error fetching comments and replies");
  }
};
