import { Box, Button, Divider, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import ImageInput from "../components/ImageInput/ImageInput";
import { addDocument } from "../services/firestoreServices";
import { NewRecipe } from "../types/documentTypes";
import {
  RecipeFormData,
  RecipesCategories,
  RecipesCuisine,
} from "../types/recipeFormDataTypes";
import { fetchNutritionData } from "../utils/fetchNutritionData";
import { uploadImages } from "../utils/uploadImages";
import { recipeFormValidationPattern } from "../utils/validationPatterns";
import FormInput from "./FormInput";
import FormList from "./FormList";
import SelectInput from "./SelectInput";
import TimeInput from "./TimeInput";

const CreateNewRecipe: React.FC = () => {
  const defaultValue = {
    title: "",
    images: [],
    description: "",
    ingredients: [{ id: "", value: "" }],
    instructions: [{ id: "", value: "" }],
    servings: 0,
    cookingTime: {},
    prepTime: {},
    cuisine: "",
    categories: [],
  };

  const { control, handleSubmit, reset } = useForm<RecipeFormData>({
    defaultValues: defaultValue,
  });

  const onSubmit = async (data: RecipeFormData) => {
    const {
      title,
      servings,
      categories,
      cookingTime,
      cuisine,
      description,
      images,
      ingredients,
      instructions,
      prepTime,
    } = data;
    try {
      const imageUrls = await uploadImages(images.map((img) => img.file));
      const ingredientsList = ingredients.map((ingredient) => ingredient.value);
      const instructionsList = instructions.map(
        (instruction) => instruction.value
      );

      const nutritionData = await fetchNutritionData(ingredientsList, servings);

      const newRecipeData: NewRecipe = {
        title,
        servings,
        categories,
        cookTime: cookingTime,
        cuisine,
        description,
        ingredients: ingredientsList,
        instructions: instructionsList,
        preparationTime: prepTime,
        // will change after implementing authentication
        author: {
          name: "Emily Clark",
          image:
            "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        image: imageUrls[0],
        createdAt: new Date(),
        nutritionInformation: nutritionData,
      };

      await addDocument("recipes", newRecipeData);
      reset();
    } catch (error) {
      console.error("Error saving recipe: ", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: { xs: 10, md: 12, lg: 15 },
        mb: { xs: 8, md: 10 },
      }}
    >
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Create new recipe
        </Typography>
        <Button
          variant="contained"
          sx={{
            px: 4,
          }}
          type="submit"
        >
          Save
        </Button>
      </Box>
      <Divider />

      <Box
        sx={{
          width: { xs: "100%", sm: "80%", md: "60%" },
          mt: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          alignSelf: "center",
        }}
      >
        <FormInput
          name="title"
          control={control}
          label="Recipe Title:"
          defaultValue=""
          maxLength={50}
          rules={recipeFormValidationPattern.title}
          placeholder="Write your recipe title"
        />
        <Box sx={{ mt: 3 }}>
          <Controller
            name="images"
            control={control}
            rules={recipeFormValidationPattern.images}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <ImageInput
                  title="Recipe Image:"
                  value={value}
                  onChange={() => onChange}
                  error={error?.message}
                />
              </>
            )}
          />
        </Box>
        <FormInput
          name="description"
          control={control}
          label="Description:"
          defaultValue=""
          rules={recipeFormValidationPattern.description}
          maxLength={100}
          placeholder="Introduce your recipe"
        />
        <FormList
          control={control}
          title="Ingrediens"
          fieldName="ingredients"
          placeholder="Enter ingredient"
        />
        <FormList
          control={control}
          title="Instructions"
          fieldName="instructions"
          placeholder="Enter step"
        />
        <FormInput
          name="servings"
          control={control}
          label="Servings:"
          defaultValue={0}
          type="number"
          rules={recipeFormValidationPattern.servings}
          placeholder="#"
          additionalInfo="How many portions does this recipe make?"
        />

        <TimeInput
          label="Cooking Time"
          name={{
            hoursName: "cookingTime.hours",
            minutesName: "cookingTime.minutes",
          }}
          control={control}
          defaultValues={{}}
          additionalInfo="How long does it take to cook this recipe?"
          rules={{
            hours: recipeFormValidationPattern.hours,
            minutes: recipeFormValidationPattern.minutes,
          }}
        />

        <TimeInput
          label="Prep time"
          name={{
            hoursName: "prepTime.hours",
            minutesName: "prepTime.minutes",
          }}
          control={control}
          defaultValues={{}}
          additionalInfo="How long does it take to prepare this recipe?"
          rules={{
            hours: recipeFormValidationPattern.hours,
            minutes: recipeFormValidationPattern.minutes,
          }}
        />

        <SelectInput
          name="cuisine"
          control={control}
          label="Cuisine"
          rules={recipeFormValidationPattern.cuisine}
          options={Object.values(RecipesCuisine)}
          defaultValue=""
        />
        <SelectInput
          name="categories"
          control={control}
          label="Categories"
          rules={recipeFormValidationPattern.categories}
          multipleSelect={true}
          options={Object.values(RecipesCategories)}
          defaultValue={[]}
        />
      </Box>
    </Box>
  );
};

export default CreateNewRecipe;
