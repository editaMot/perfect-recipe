import { Box, Typography } from "@mui/material";
import { User as UserProps } from "../types/UserTypes";

const User: React.FC<UserProps> = ({ name, image }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
    <Box
      sx={{
        width: 30,
        height: 30,
        borderRadius: "50%",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
    <Typography sx={{ fontWeight: 700, fontSize: { md: "16px", lg: "18px" } }}>
      {name}
    </Typography>
  </Box>
);

export default User;
