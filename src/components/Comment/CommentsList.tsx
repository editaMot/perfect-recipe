import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { Comment as CommentType } from "../../types/documentTypes";
import Comment from "./Comment";

interface CommentsListProps {
  comments?: CommentType[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => (
  <Box sx={{ mt: { xs: 5, sm: 8, md: 10 } }}>
    <Typography variant="h4" sx={{ mb: { xs: 3, sm: 5 } }}>
      Comments
    </Typography>
    {comments && comments.length > 0 ? (
      <Box>
        {comments?.map((comment) => (
          <Box key={comment.id} sx={{ mb: 4 }}>
            <Comment comment={comment} />
            {comment.replies && comment.replies.length > 0 && (
              <Box sx={{ ml: { xs: 5, sm: 8, md: 12 } }}>
                {comment.replies.map((reply: CommentType) => (
                  <Comment key={reply.id} comment={reply} reply />
                ))}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    ) : (
      <Typography sx={{ mb: 2 }}>
        This recipe don't have any comments.
      </Typography>
    )}
    <Divider sx={{ mb: 2 }} />
  </Box>
);

export default CommentsList;
