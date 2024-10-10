import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAddReply } from "../../services/mutations/useAddReply";
import { useUpdateCommentLikes } from "../../services/mutations/useUpdateCommentLikes";
import { Comment as CommentType, NewComment } from "../../types/documentTypes";
import { calculateTimeDifference } from "../../utils/calculateTimeDifference";
import CommentTextfield from "./CommentTextfield";

interface CommentProps {
  comment: CommentType;
  reply?: boolean;
}

interface FormValues {
  comment: string;
}

const Comment: React.FC<CommentProps> = ({ comment, reply = false }) => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [openReply, setOpenReply] = useState<boolean>(false);
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      comment: "",
    },
  });
  const { isSubmitting, addReply } = useAddReply();
  const { isLiking, updateCommentLikes } = useUpdateCommentLikes();
  const { author, createdAt, text, likedBy = [], id: commentId } = comment;
  //change after implementinf authentication
  const userId = "UgmRjQ854xMU3ST8LiVv";

  const onSubmit = useCallback((data: FormValues) => {
    if (data.comment.length > 0 && recipeId && commentId) {
      const replyData: NewComment = {
        // will change after implementing authentication
        author: {
          name: "Emily Clark",
          image:
            "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        createdAt: Timestamp.now(),
        text: data.comment,
        likedBy: [],
      };
      addReply({ recipeId, commentId, replyData });
    }
    reset();
    setOpenReply(false);
  }, []);

  const toggleOpenReply = () => {
    setOpenReply((prev) => !prev);
  };

  const handleLikeToggle = () => {
    if (!recipeId || !commentId) return;
    updateCommentLikes({
      commentId,
      recipeId,
      userId,
      currentLikedBy: likedBy,
    });
  };

  return (
    <>
      <Divider />
      <Box
        sx={{
          display: "flex",
          gap: { xs: 3, sm: 4 },
          alignItems: "center",
          mt: 3,
        }}
      >
        <Avatar
          src={author.image}
          alt={author.name}
          sx={{
            width: { xs: "3rem", sm: "4rem" },
            height: { xs: "3rem", sm: "4rem" },
          }}
        />
        <Box>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            {author.name}
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "secondary.light" }}>
            {calculateTimeDifference(createdAt)}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ my: 3, ml: { xs: 5, sm: 8, md: 12 } }}>
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ mb: 2.5 }}>{text}</Typography>
          {!reply && (
            <>
              <Button
                onClick={toggleOpenReply}
                startIcon={
                  <InsertCommentOutlinedIcon sx={{ color: "primary.light" }} />
                }
                sx={{ textTransform: "none", color: "secondary.light" }}
              >
                Reply
              </Button>

              <Button
                startIcon={
                  likedBy.includes(userId) ? (
                    <FavoriteIcon sx={{ color: "primary.light" }} />
                  ) : (
                    <FavoriteBorderOutlinedIcon
                      sx={{ color: "primary.light" }}
                    />
                  )
                }
                disabled={isLiking}
                onClick={handleLikeToggle}
                sx={{ textTransform: "none", color: "secondary.light" }}
              >
                {likedBy.length}
              </Button>
            </>
          )}
        </Box>
        {openReply && (
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <CommentTextfield name="comment" control={control} required />
            <Button
              disabled={isSubmitting}
              variant="contained"
              type="submit"
              sx={{ alignSelf: "flex-end" }}
            >
              {isSubmitting ? "Submitting..." : "Reply"}
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Comment;
