import ShareIcon from "@mui/icons-material/Share";
import { IconButton, Tooltip } from "@mui/material";
import { useCallback } from "react";
import toast from "react-hot-toast";

interface ShareButtonProps {
  title: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title }) => {
  const handleURLCopy = useCallback(() => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.success("Recipe URL copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy the URL.");
      });
  }, []);

  return (
    <Tooltip title={title} onClick={handleURLCopy}>
      <IconButton color="primary">
        <ShareIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ShareButton;
