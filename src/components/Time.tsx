import { Box, Typography } from "@mui/material";
import { Time as TimeType } from "../types/documentTypes";

interface TimeProps {
  title: string;
  time: TimeType;
}

const Time: React.FC<TimeProps> = ({ title, time }) => {
  const { hours, minutes } = time;
  return (
    <Box>
      <Typography sx={{ fontWeight: "bold" }}>{title}:</Typography>
      {hours > 0 && <Typography>{hours} h</Typography>}
      {minutes > 0 && <Typography>{minutes} min</Typography>}
    </Box>
  );
};

export default Time;
