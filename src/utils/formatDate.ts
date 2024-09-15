import { Timestamp } from "firebase/firestore";

export const formatDate = (date: Timestamp | string) => {
  if (!date) return "Unknown Date";

  let createdAtDate: Date;

  if (date instanceof Timestamp) {
    createdAtDate = date.toDate();
  } else if (typeof date === "string") {
    createdAtDate = new Date(date);
  } else {
    return "Unknown Date";
  }

  if (isNaN(createdAtDate.getTime())) {
    return "Invalid Date";
  }

  return createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
