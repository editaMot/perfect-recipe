import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Button } from "@mui/material";
import { useState } from "react";

interface TagsProps {
  tags: string[];
  activeTags: string[];
  handleActiveTags: (tag: string, action: "add" | "remove") => void;
}

const Tags: React.FC<TagsProps> = ({ tags, activeTags, handleActiveTags }) => {
  const [showAllTags, setShowAllTags] = useState<boolean>(false);

  const tagsList = tags.filter((tag) => !activeTags.includes(tag));

  const tagsToShow = showAllTags ? tagsList : tagsList.slice(0, 5);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {tagsToShow.map((tag) => (
          <Button
            variant="contained"
            key={tag}
            onClick={() => handleActiveTags(tag, "add")}
          >
            {tag}
          </Button>
        ))}
        {tagsList.length > 5 && (
          <Button
            onClick={() => setShowAllTags(!showAllTags)}
            variant="outlined"
          >
            {showAllTags ? "Show Less" : "Show More"}
          </Button>
        )}
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
        {activeTags.map((tag) => (
          <Button
            key={tag}
            endIcon={<CancelIcon />}
            size="small"
            onClick={() => handleActiveTags(tag, "remove")}
          >
            {tag}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Tags;
