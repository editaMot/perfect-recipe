import { Timestamp } from "firebase/firestore";

const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_DAY = 86400;

export const calculateTimeDifference = (timestamp: Timestamp): string => {
  const commentDate = timestamp.toDate();
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - commentDate.getTime()) / 1000
  );

  const days = Math.floor(diffInSeconds / SECONDS_IN_DAY);
  const hours = Math.floor((diffInSeconds % SECONDS_IN_DAY) / SECONDS_IN_HOUR);
  const minutes = Math.floor(
    (diffInSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE
  );
  const seconds = diffInSeconds % SECONDS_IN_MINUTE;

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
