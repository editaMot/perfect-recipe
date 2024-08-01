import { Box } from "@mui/material";
import { Image } from "./ImageInput";

interface AddedImagesProps {
  images: Image[] | null;
  coverImage: Image | null;
  activeImage: Image | null;
  activeImageHandler: (image: Image) => void;
}

const AddedImages: React.FC<AddedImagesProps> = ({
  images,
  coverImage,
  activeImage,
  activeImageHandler,
}) => (
  <Box sx={{ display: "flex", gap: 1, overflowX: "auto" }}>
    {images?.map((image, index) => (
      <Box key={image.id} sx={{ position: "relative" }}>
        {coverImage === image && (
          <Box
            component="span"
            sx={{
              position: "absolute",
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              px: 2,
              py: 0.5,
              fontSize: "12px",
              borderRadius: 1,
            }}
          >
            Cover
          </Box>
        )}
        <Box
          component="img"
          sx={{
            width: 100,
            aspectRatio: 1 / 1,
            objectFit: "cover",
            borderRadius: 1,
            border: activeImage === image ? "4px solid" : "1px solid",
            borderColor:
              activeImage === image ? "primary.main" : "secondary.light",
          }}
          src={image.src}
          alt={`${index} dish photo`}
          onClick={() => activeImageHandler(image)}
        />
      </Box>
    ))}
  </Box>
);

export default AddedImages;
