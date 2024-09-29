import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/login.webp";
import signupImg from "../assets/signup.webp";
import { auth } from "../firebaseConfig";
import { RoutePages } from "../routes/RoutePages";
import { useAuthMutations } from "../services/mutations/useAuthMutationsReturn";
import ControlledTextField from "./ControlledTextfield";
import Logo from "./Logo";

interface FormInputs {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface AuthFormProps {
  isSignUp: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignUp }) => {
  const { control, handleSubmit } = useForm<FormInputs>();
  const { isSigningUp, isLoggingIn, signup, login } = useAuthMutations();
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const socialSignIn = useCallback(
    async (
      provider: GoogleAuthProvider | FacebookAuthProvider,
      successMessage: string
    ) => {
      try {
        await signInWithPopup(auth, provider);
        toast.success(successMessage);
        navigate(isSignUp ? RoutePages.Login : RoutePages.Home);
      } catch (error) {
        toast.error((error as Error).message);
      }
    },
    [navigate, isSignUp]
  );

  const handleGoogleSignIn = () => {
    socialSignIn(
      googleProvider,
      isSignUp
        ? "Google signup successful. Please log in"
        : "Google login successful!"
    );
  };

  const handleFacebookSignIn = () => {
    socialSignIn(
      facebookProvider,
      isSignUp
        ? "Facebook signup successful. Please log in"
        : "Facebook login successful!"
    );
  };

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    (data) => {
      if (isSignUp && data.password !== data.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const credentials = { email: data.email, password: data.password };

      if (isSignUp) {
        signup(credentials);
      } else {
        login(credentials);
      }
    },
    [isSignUp, signup, login]
  );

  if (isLoggingIn || isSigningUp) return <p>Loading...</p>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: { xs: 10, sm: 15, lg: 20 },
        mb: { xs: 7, lg: 20 },
        boxShadow: { md: 1 },
        borderRadius: { md: 1 },
        p: { md: 2, lg: 3, xl: 4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 5 },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            aspectRatio: { xs: 5 / 3, md: 2 / 2 },
            backgroundImage: `url(${isSignUp ? signupImg : loginImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: 1,
          }}
        />

        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Typography
            variant="h3"
            sx={{ mb: isSignUp ? 2 : { xs: 3, md: 5 }, fontWeight: "bold" }}
          >
            {isSignUp ? "Join Our Community" : "Welcome Back"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {isSignUp && (
              <ControlledTextField
                control={control}
                name="name"
                label="Name"
                required
                rules={{ required: "Enter your full name" }}
              />
            )}
            <ControlledTextField
              control={control}
              name="email"
              label="Email"
              type="email"
              required
              rules={{
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              }}
            />
            <ControlledTextField
              control={control}
              name="password"
              label="Password"
              type="password"
              required
              rules={{
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
            />
            {isSignUp && (
              <ControlledTextField
                control={control}
                name="confirmPassword"
                label="Repeat password"
                type="password"
                required
              />
            )}
            {isSignUp && (
              <FormControlLabel
                control={<Checkbox required />}
                label={
                  <Box
                    component="span"
                    sx={{
                      fontSize: { xs: "16px", lg: "18px" },
                      color: "secondary.main",
                    }}
                  >
                    I agree to the terms & policy
                  </Box>
                }
              />
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ alignSelf: "flex-start", px: 4, mb: isSignUp ? 0 : 4 }}
            >
              {isSignUp ? "Sign Up" : "Log In"}
            </Button>
          </Box>
          <Typography
            sx={{ mt: 2, color: "secondary.main", fontSize: { xs: "16px" } }}
          >
            Or you can {isSignUp ? "join" : "login"} with
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
            >
              Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<FacebookIcon />}
              onClick={handleFacebookSignIn}
            >
              Facebook
            </Button>
          </Box>
          <Typography
            sx={{ mt: 2, color: "secondary.main", fontSize: { xs: "16px" } }}
          >
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <a href={isSignUp ? RoutePages.Login : RoutePages.Signup}>
              {isSignUp ? "Log in" : "Sign up"}
            </a>
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          alignSelf: "flex-end",
          display: { xs: "none", md: "inline-block" },
          mt: 3,
        }}
      >
        <Logo />
      </Box>
    </Box>
  );
};

export default AuthForm;
