import CloseIcon from "@mui/icons-material/Close";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Toolbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthButtons from "./AuthButtons";
import Logo from "./Logo";
import NavItems from "./NavItems";

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const location = useLocation();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: scrolled ? "background.default" : "transparent",
        color: "secondary.dark",
        py: { xs: 1, md: 1.5, xl: 2 },
        boxShadow: scrolled ? "secondary.main" : "none",
        transition: "box-shadow 0.3s",
      }}
    >
      <Container>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Logo />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <NavItems activePath={location.pathname} variant="desktop" />
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <AuthButtons />
          </Box>
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              flexDirection: "column",
            }}
          >
            <IconButton
              size="large"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuOutlinedIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={open}
              onClose={toggleDrawer(false)}
              sx={{
                display: { xs: "flex", md: "none" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: { xs: "100dvw", sm: "60dvw" },
                  px: 5,
                  py: 2,
                }}
              >
                <IconButton
                  size="large"
                  sx={{ alignSelf: "flex-end" }}
                  onClick={toggleDrawer(false)}
                >
                  <CloseIcon />
                </IconButton>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2.5,
                  }}
                >
                  <Box>
                    <NavItems activePath={location.pathname} variant="mobile" />
                  </Box>
                  <AuthButtons />
                </Box>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
