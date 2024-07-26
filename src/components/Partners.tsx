import { Box } from "@mui/material";
import { PARTNERS_LIST } from "../constants/PartnersList";

const Partners: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: { xs: "wrap", sm: "nowrap" },
        gap: { xs: 3, sm: 4, md: 6, lg: 8 },
        px: 2,
        py: { xs: 5 },
      }}
    >
      {PARTNERS_LIST.map(({ title, image }) => (
        <Box
          component="img"
          key={title}
          src={image}
          alt={title}
          sx={{
            height: { xs: 22, sm: 25, md: 30 },
          }}
        />
      ))}
    </Box>
  );
};

export default Partners;
