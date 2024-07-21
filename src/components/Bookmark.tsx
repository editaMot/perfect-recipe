import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { Button } from "@mui/material";
import { useState } from "react";
import { useBookmarkRecipe } from "../services/mutations/useBookmarkRecipe";
import { useDeleteBookmarkedRecipe } from "../services/mutations/useDeleteBookmarkedRecipe";

type BookmarkProps = {
  withText?: boolean;
  recipeId: string;
};

const withTextStyle = {
  gap: 0.5,
};

const withoutTextStyle = {
  padding: 1,
  minWidth: 0,
  boxShadow: "none",
  borderColor: "background.lightGrey",
  borderWidth: 1.5,
  backgroundColor: "background.default",
  color: "primary.main",
  "&:hover": {
    backgroundColor: "background.lightGrey",
    boxShadow: "none",
  },
};

const Bookmark = ({ recipeId, withText = false }: BookmarkProps) => {
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [bookmarkId, setBookmarkId] = useState<string>("");
  const { isSaving, bookmarkRecipe } = useBookmarkRecipe();
  const { isDeleting, deleteBookmarkedRecipe } = useDeleteBookmarkedRecipe();

  //will change after implementing authentication functionality
  const isAuthenticated = true;
  const userId = "UgmRjQ854xMU3ST8LiVv";

  const handleClick = () => {
    if (bookmarked) {
      deleteBookmarkedRecipe(bookmarkId);
    } else {
      bookmarkRecipe(
        { userId, recipeId },
        {
          onSuccess: (docId) => setBookmarkId(docId || ""),
        }
      );
    }
    setBookmarked((prev) => !prev);
  };

  return (
    <Button
      variant="outlined"
      sx={{
        ...(withText ? withTextStyle : withoutTextStyle),
        "&.Mui-disabled": {
          color: isAuthenticated ? "default" : "primary.main",
        },
      }}
      onClick={handleClick}
      disabled={!isAuthenticated ? true : isSaving || isDeleting ? true : false}
    >
      {bookmarked || !isAuthenticated ? (
        <BookmarkOutlinedIcon fontSize="small" />
      ) : (
        <BookmarkBorderOutlinedIcon fontSize="small" />
      )}
      {withText && bookmarked ? "Remove from Favorite" : "Add To Favorite"}
    </Button>
  );
};

export default Bookmark;
