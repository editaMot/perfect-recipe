import { Box, Button, Typography } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { SyntheticEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAddComment } from "../services/mutations/useAddComment";
import { useRateRecipe } from "../services/mutations/useRateRecipe";
import { NewComment, RecipeRating } from "../types/documentTypes";
import CommentTextfield from "./Comment/CommentTextfield";
import Rating from "./Rating";

interface RateRecipeProps {
  recipeId: string;
}

interface FormValues {
  comment: string;
  rating: number;
}

const RateRecipe: React.FC<RateRecipeProps> = ({ recipeId }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      comment: "",
    },
  });

  const { isSubmitting, addComment } = useAddComment();
  const { isRating, rateRecipe } = useRateRecipe();

  const userId = "UgmRjQ854xMU3ST8LiVv";

  const onSubmit = async (data: FormValues) => {
    try {
      if (data.comment.length > 0) {
        const commentData: NewComment = {
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
        addComment({ recipeId, commentData });
      }
      if (data.rating) {
        const recipeRating: RecipeRating = {
          recipeId: recipeId,
          rating: data.rating,
          userId: userId,
        };
        rateRecipe(recipeRating);
      }
    } catch (error) {
      throw new Error("There was an error adding rating");
    }

    setValue("comment", "");
    setValue("rating", 0);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 1, md: 2 },
        my: { xs: 4, sm: 6, md: 8 },
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Rate this recipe and share your opinion
      </Typography>
      <Controller
        name="rating"
        control={control}
        rules={{
          required: "Rating is required.",
        }}
        render={({ field }) => (
          <>
            <Rating
              size="large"
              recipeId={recipeId}
              userRating={field.value}
              ratingChangeHandler={(
                event: SyntheticEvent,
                value: number | null
              ) => {
                field.onChange(value ?? 0);
              }}
            />
            {errors.rating && (
              <Typography color="error">{errors.rating.message}</Typography>
            )}
          </>
        )}
      />
      <CommentTextfield control={control} name="comment" />
      <Button
        variant="contained"
        type="submit"
        disabled={isSubmitting || isRating}
        sx={{
          alignSelf: "flex-end",
          px: 4,
          backgroundColor: "primary.light",
        }}
      >
        Post
      </Button>
    </Box>
  );
};

export default RateRecipe;
