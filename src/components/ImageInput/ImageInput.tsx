import { Box } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MAX_IMAGES } from "../../constants/constants";
import ActiveImage from "./ActiveImage";
import AddedImages from "./AddedImages";
import AddImage from "./AddImage";

export interface Image {
  id: string;
  src: string;
}

const ImageInput: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [activeImage, setActiveImage] = useState<Image | null>(null);
  const [coverImage, setCoverImage] = useState<Image | null>(null);
  const amountOfImages = images.length;

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages: Image[] = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          newImages.unshift({ id: uuidv4(), src: result });
          if (newImages.length === files.length) {
            setImages((prevImages) => {
              const updatedImages = [...newImages, ...prevImages];
              if (activeImage === null || updatedImages[0] !== activeImage) {
                setActiveImage(updatedImages[0]);
              }
              return updatedImages.slice(0, MAX_IMAGES);
            });
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteImage = (): void => {
    if (coverImage === activeImage) setCoverImage(null);
    if (activeImage) {
      setImages((prevImages) => {
        const updatedImages = prevImages.filter(
          (image) => image !== activeImage
        );
        const nextActiveImage =
          updatedImages.length > 0 ? updatedImages[0] : null;
        setActiveImage(nextActiveImage);
        return updatedImages;
      });
    }
  };

  const handleCoverImageSet = (): void => {
    if (activeImage) {
      setCoverImage(activeImage);
    }
  };

  const handleActiveImageSet = (image: Image): void => {
    setActiveImage(image);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <ActiveImage
        activeImage={activeImage}
        coverHandler={handleCoverImageSet}
        deleteHandler={handleDeleteImage}
        coverImage={coverImage}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "flex-start",
        }}
      >
        <AddImage
          amountOfImages={amountOfImages}
          imageAddHandler={handleAddImage}
        />
        {images && (
          <AddedImages
            images={images}
            coverImage={coverImage}
            activeImage={activeImage}
            activeImageHandler={handleActiveImageSet}
          />
        )}
      </Box>
    </Box>
  );
};

export default ImageInput;
