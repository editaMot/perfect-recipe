import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RoutePages } from "../../routes/RoutePages";
import { signIn, signUp } from "../auth";

interface UseAuthMutationsReturn {
  isSigningUp: boolean;
  isLoggingIn: boolean;
  signup: (credentials: { email: string; password: string }) => void;
  login: (credentials: { email: string; password: string }) => void;
}

export const useAuthMutations = (): UseAuthMutationsReturn => {
  const navigate = useNavigate();

  const { mutate: signup, status: signupStatus } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Signup successful. Please log in.");
      navigate(RoutePages.Login);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const { mutate: login, status: loginStatus } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      toast.success("Login successful!");
      navigate(RoutePages.Home);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const isSigningUp = signupStatus === "pending";
  const isLoggingIn = loginStatus === "pending";

  return { isSigningUp, isLoggingIn, signup, login };
};
