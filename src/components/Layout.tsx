import { Box } from "@mui/material";
import Footer from "./Footer/Footer";
import Header from "./Header";
import Main from "./Main";

const Layout: React.FC = () => (
  <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <Header />
    <Main />
    <Footer />
  </Box>
);

export default Layout;
