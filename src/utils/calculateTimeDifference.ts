import { Timestamp } from "firebase/firestore";

export const calculateTimeDifference = (timestamp: Timestamp): string => {
  const commentDate = timestamp.toDate();
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - commentDate.getTime()) / 1000
  );

  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;

  const days = Math.floor(diffInSeconds / secondsInDay);
  const hours = Math.floor((diffInSeconds % secondsInDay) / secondsInHour);
  const minutes = Math.floor((diffInSeconds % secondsInHour) / secondsInMinute);
  const seconds = diffInSeconds % secondsInMinute;

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }
};
