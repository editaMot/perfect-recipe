import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavPages } from "../constants/NavPages";
import { buildPath } from "../utils/pathBuilder";

type NavItemsProps = {
  activePath: string;
  variant: "mobile" | "desktop";
};

const NavItems = ({ activePath, variant }: NavItemsProps) => {
  const navigate = useNavigate();

  const desktopStyles = {
    margin: 1,
  };

  const mobileStyles = {
    marginBottom: 1,
    "&:hover": {
      backgroundColor: "background.lightGrey",
      borderRadius: 1,
    },
    padding: 1,
    fontSize: "16px",
    textAlign: "center",
  };

  return (
    <>
      {Object.values(NavPages).map((page) => {
        const path = buildPath(page);
        const isActive = activePath === path;
        return (
          <Typography
            key={page}
            sx={{
              cursor: "pointer",
              color: isActive ? "primary.main" : "inherit",
              ...(variant === "desktop" ? desktopStyles : mobileStyles),
            }}
            onClick={() => navigate(path)}
          >
            {page}
          </Typography>
        );
      })}
    </>
  );
};

export default NavItems;
