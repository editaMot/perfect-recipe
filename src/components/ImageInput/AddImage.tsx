import { Box, Typography } from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { MAX_IMAGES } from "../../constants/constants";

interface AddImageProps {
  amountOfImages: number;
  imageAddHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddImage: React.FC<AddImageProps> = ({
  amountOfImages,
  imageAddHandler,
}) => (
  <Box
    component="span"
    sx={{
      height: 100,
      p: 2,
      border: "1px solid",
      borderColor: "secondary.light",
      backgroundColor: "background.lightGrey",
      borderRadius: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <input
      disabled={amountOfImages >= MAX_IMAGES}
      accept="image/*"
      style={{ display: "none" }}
      id="image-file"
      type="file"
      onChange={imageAddHandler}
    />
    <label
      htmlFor="image-file"
      style={{
        textAlign: "center",
        cursor: amountOfImages >= MAX_IMAGES ? "not-allowed" : "pointer",
      }}
    >
      <CameraAltOutlinedIcon color="primary" />
      <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
        Add Photo
      </Typography>
    </label>
  </Box>
);

export default AddImage;
