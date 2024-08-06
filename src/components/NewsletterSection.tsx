import { Box } from "@mui/material";
import Newsletter from "./Newsletter";

const NewsletterSection = () => (
  <Box
    component="section"
    sx={{
      backgroundColor: "background.accent",
      py: 7,
      px: 3,
      position: "relative",
      left: "50%",
      right: "50%",
      marginLeft: "-50vw",
      marginRight: "-50vw",
      width: "100vw",
    }}
  >
    <Newsletter
      flexDirection="row"
      heading="Let's Stay In Touch"
      details="Join our newsletter, so that we reach out to you with our news and offers."
    />
  </Box>
);

export default NewsletterSection;
