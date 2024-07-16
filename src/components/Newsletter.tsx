import { Box, Button, InputAdornment, TextField } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

interface NewsletterProps {
  flexDirection: "row" | "column";
}

const Newsletter = ({ flexDirection }: NewsletterProps) => {
  console.log(<TextField />);
  return (
    <Box
      display="flex"
      gap={2}
      sx={{
        flexDirection: {
          xs: "column",
          sm: `${flexDirection}`,
        },
      }}
    >
      <TextField
        placeholder="Enter Your Email"
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
          "& input::placeholder": {
            fontSize: "16px",
          },
        }}
      />
      <Button variant="contained" sx={{ backgroundColor: "primary.light" }}>
        Subscribe
      </Button>
    </Box>
  );
};

export default Newsletter;
