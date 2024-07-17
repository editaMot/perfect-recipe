import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Newsletter } from "../types/documentTypes";

type DocumentData = Newsletter;

export const addDocument = async (
  collectionName: string,
  data: DocumentData
) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
