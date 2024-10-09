import { Box, Button, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface SectionProps {
  title: string;
  withBtn?: boolean;
  children: ReactNode;
  navigateTo: string;
}

const Section: React.FC<SectionProps> = ({
  title,
  withBtn = true,
  children,
  navigateTo,
}) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ my: { xs: 6, sm: 8, md: 10 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mb: 6,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        {withBtn && (
          <Button
            onClick={() => navigate(navigateTo)}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            View More
          </Button>
        )}
      </Box>
      {children}
    </Box>
  );
};

export default Section;
