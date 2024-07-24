import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Links {
  title: string;
  routeLink: string;
}

interface FooterLinksGroupProps {
  groupTitle: string;
  links: Array<Links>;
}

const FooterLinksGroup: React.FC<FooterLinksGroupProps> = ({
  groupTitle,
  links,
}) => {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 700,
          mb: 2,
          textAlign: { xs: "center", xl: "start" },
        }}
      >
        {groupTitle}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          rowGap: 1,
          flexWrap: "wrap",
          maxHeight: { xs: 100, lg: 130, xl: 250 },
        }}
      >
        {links.map(({ title, routeLink }) => (
          <Typography
            key={title}
            sx={{
              cursor: "pointer",
              "&:hover": { color: "primary.main" },
            }}
            onClick={() => navigate(routeLink)}
          >
            {title}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default FooterLinksGroup;
