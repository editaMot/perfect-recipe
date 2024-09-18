import { Timestamp } from "firebase/firestore";

export const formatDate = (date: Timestamp) => {
  if (!date) return "Unknown Date";

  const createdAtDate = date?.toDate();

  return createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
