import { Box, Typography } from "@mui/material";
import SocialMedia from "../SocialMedia";

const FooterBottom: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        mt: { xs: 2, sm: 3 },
        gap: 1,
      }}
    >
      <Typography
        component="span"
        sx={{ color: "secondary.main", textAlign: "center" }}
      >
        &copy; {new Date().getFullYear()} PerfectRecipe. All Right Reserved
      </Typography>
      <SocialMedia />
    </Box>
  );
};

export default FooterBottom;
