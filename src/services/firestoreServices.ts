import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { BookmarkedRecipes } from "../types/documentTypes.ts";

type DocumentData = BookmarkedRecipes;

export const getDocuments = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error getting documents: ", e);
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
