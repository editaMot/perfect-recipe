import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

export const signIn = async (credentials: {
  email: string;
  password: string;
}): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(
    auth,
    credentials.email,
    credentials.password
  );
};

export const signOutUser = async () => {
  return await signOut(auth);
};

export const signUp = async (credentials: {
  email: string;
  password: string;
}): Promise<UserCredential> => {
  return await createUserWithEmailAndPassword(
    auth,
    credentials.email,
    credentials.password
  );
};
