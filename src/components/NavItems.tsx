import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NAV_LINKS } from "../constants/NavLinks";

interface NavItemsProps {
  activePath: string;
  variant: "mobile" | "desktop";
}

const DESKTOP_STYLES = {
  margin: 1,
};

const MOBILE_STYLES = {
  marginBottom: 1,
  "&:hover": {
    backgroundColor: "background.lightGrey",
    borderRadius: 1,
  },
  padding: 1,
  fontSize: "16px",
  textAlign: "center",
};

const NavItems = ({ activePath, variant }: NavItemsProps) => {
  const navigate = useNavigate();

  return (
    <>
      {NAV_LINKS.map(({ title, routeLink }) => {
        const isActive = activePath === routeLink;
        return (
          <Typography
            key={title}
            sx={{
              cursor: "pointer",
              color: isActive ? "primary.main" : "inherit",
              ...(variant === "desktop" ? DESKTOP_STYLES : MOBILE_STYLES),
            }}
            onClick={() => navigate(routeLink)}
          >
            {title}
          </Typography>
        );
      })}
    </>
  );
};

export default NavItems;
