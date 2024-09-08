import { Add as AddIcon } from "@mui/icons-material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Control, useFieldArray } from "react-hook-form";
import { RecipeFormData } from "../types/recipeFormDataTypes";
import FormInput from "./FormInput";

interface IngredientsListProps {
  control: Control<RecipeFormData>;
}

const IngredientsList: React.FC<IngredientsListProps> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <Box>
      <Typography variant="h5">Ingredients:</Typography>
      {fields.map((field, index) => (
        <Box
          key={field.id}
          sx={{ display: "flex", alignItems: "center", mb: 2 }}
        >
          <FormInput
            name={`ingredients.${index}.value`}
            control={control}
            defaultValue={field.value}
            placeholder="Add ingredient"
            rules={{
              required: "Ingredient is required",
            }}
          />
          {index !== 0 && (
            <IconButton
              onClick={() => remove(index)}
              sx={{
                ml: 2,
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          )}
        </Box>
      ))}
      <Button
        startIcon={<AddIcon />}
        onClick={() => append({ id: "", value: "" })}
        variant="text"
      >
        Add Ingredient
      </Button>
    </Box>
  );
};

export default IngredientsList;
