import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { addDocument } from "../services/firestoreServices";
import { emailPattern } from "../utils/validationPatterns";

interface NewsletterProps {
  flexDirection: "row" | "column";
  heading?: string;
  details?: string;
  footer?: boolean;
}

interface FormValues {
  email: string;
}

const Newsletter = ({
  flexDirection,
  heading,
  details,
  footer,
}: NewsletterProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await addDocument("newsletter", data);
    reset();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: `${!footer ? "center" : ""}`,
        textAlign: "center",
        gap: {
          xs: 2,
          sm: `${!footer ? 2 : 3}`,
        },
      }}
    >
      <Typography variant="h4" fontWeight="600">
        {heading}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "secondary.main",
          maxWidth: 500,
        }}
      >
        {details}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: `${flexDirection}`,
          },
          gap: 2,
        }}
      >
        <TextField
          placeholder="Enter Your Email"
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: emailPattern.value,
              message: emailPattern.message,
            },
          })}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            borderColor: "primary.light",
            width: {
              sm: `${footer || flexDirection === "column" ? "100%" : "70%"}`,
            },
            backgroundColor: "background.default",
            borderRadius: "8px",
            "& .MuiInputBase-input": {
              fontSize: "15px",
            },
            "& .MuiFormHelperText-root": {
              marginTop: "8px",
              fontSize: "14px",
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "primary.light",
            alignSelf: {
              sm: `${flexDirection === "row" ? "baseline" : ""}`,
            },
            px: "30px",
          }}
        >
          Subscribe
        </Button>
      </Box>
    </Box>
  );
};

export default Newsletter;
