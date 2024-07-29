import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const Main: React.FC = () => (
  <Container component="main" sx={{ flex: 1, px: { xl: 0 } }}>
    <Outlet />
  </Container>
);

export default Main;
