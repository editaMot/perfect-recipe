import { uploadImageToStorage } from "../services/firestoreServices";

export const uploadImages = async (imageFiles: (File | undefined)[]) => {
  const imageUrls = await Promise.all(
    imageFiles.map(async (file) => {
      if (file) {
        return await uploadImageToStorage(file);
      }
      return null;
    })
  );
  return imageUrls.filter((url) => url !== null);
};
