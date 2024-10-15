import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MAX_IMAGES } from "../../constants/constants";
import ActiveImage from "./ActiveImage";
import AddedImages from "./AddedImages";
import AddImage from "./AddImage";

export interface Image {
  id: string;
  src: string;
  file?: File;
}

interface ImageInputProps {
  title: string;
  value: Image[];
  onChange: (images: Image[]) => void;
  error?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({
  title,
  value,
  onChange,
  error,
}) => {
  const [images, setImages] = useState<Image[]>(value);
  const [activeImage, setActiveImage] = useState<Image | null>(null);
  const [coverImage, setCoverImage] = useState<Image | null>(null);
  const amountOfImages = value.length;

  useEffect(() => {
    setImages(value);
    setActiveImage(value.length > 0 ? value[0] : null);
    setCoverImage(null);
  }, [value]);

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages: Image[] = [];

    if (files.length === 0) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          newImages.unshift({ id: uuidv4(), src: result, file: file });

          if (newImages.length === files.length) {
            setImages((prevImages) => {
              const updatedImages = [...newImages, ...prevImages];
              const limitedImages = updatedImages.slice(0, MAX_IMAGES);
              onChange(limitedImages);
              if (!activeImage || limitedImages[0] !== activeImage) {
                setActiveImage(limitedImages[0]);
              }
              return limitedImages;
            });
          }
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const handleDeleteImage = (): void => {
    if (activeImage) {
      const updatedImages = images.filter(
        (image) => image.id !== activeImage.id
      );
      setImages(updatedImages);
      onChange(updatedImages);
      setActiveImage(updatedImages.length > 0 ? updatedImages[0] : null);
      if (coverImage === activeImage) setCoverImage(null);
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
      <Typography
        sx={{ fontSize: { xs: "18px", sm: "20px", md: "22px", lg: "24px" } }}
      >
        {title}
      </Typography>
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
      {error && (
        <Typography color="error" sx={{ fontSize: { xs: "12px" }, ml: "1rem" }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default ImageInput;
