import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Box, Button, Typography } from "@mui/material";
import { Image } from "./ImageInput";

interface ActiveImageProps {
  activeImage: Image | null;
  coverImage: Image | null;
  coverHandler: () => void;
  deleteHandler: () => void;
}

const ActiveImage: React.FC<ActiveImageProps> = ({
  activeImage,
  coverHandler,
  deleteHandler,
  coverImage,
}) => {
  return (
    <Box sx={{ borderRadius: 1, overflow: "hidden" }}>
      {activeImage ? (
        <Box sx={{ position: "relative" }}>
          <Box
            component="img"
            sx={{
              aspectRatio: "16 / 9",
              width: "100%",
              objectFit: "cover",
              borderRadius: 1,
            }}
            src={activeImage.src}
            alt="Uploaded"
          />
          <Button
            size="small"
            variant="contained"
            color="secondary"
            disabled={activeImage === coverImage}
            onClick={coverHandler}
            sx={{
              position: "absolute",
              backgroundColor: "background.default",
              "&:hover": {
                backgroundColor: "background.accent",
              },
              color: "primary.main",
              top: 10,
              left: 10,
              "&:disabled": {
                backgroundColor: "background.default",
              },
            }}
          >
            Set as cover
          </Button>
          <Box
            sx={{
              display: "flex",
              position: "absolute",
              bottom: 15,
              left: 10,
              p: 0.5,
              borderRadius: 1,
              border: "1px solid",
              borderColor: "primary.main",
              color: "primary.main",
              backgroundColor: "background.default",
              "&:hover": {
                backgroundColor: "background.accent",
                cursor: "pointer",
              },
            }}
            onClick={deleteHandler}
          >
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            aspectRatio: "16 / 9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid",
            borderColor: "background.lightGrey",
            backgroundColor: "background.lightGrey",
            borderRadius: 1,
          }}
        >
          <Typography sx={{ color: "secondary.main" }}>No Image</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ActiveImage;
