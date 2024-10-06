import { useQuery } from "@tanstack/react-query";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

const useAuth = () => {
  return useQuery<User | null, Error>({
    queryKey: ["authUser"],
    queryFn: () =>
      new Promise<User | null>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          resolve(user);
          unsubscribe();
        });
      }),
    staleTime: Infinity,
  });
};

export default useAuth;
