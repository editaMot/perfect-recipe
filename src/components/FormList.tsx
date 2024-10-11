import { Add as AddIcon } from "@mui/icons-material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Control, useFieldArray } from "react-hook-form";
import { RecipeFormData } from "../types/recipeFormDataTypes";
import FormInput from "./FormInput";

interface FormListProps {
  control: Control<RecipeFormData>;
  fieldName: "instructions" | "ingredients";
  title: string;
  placeholder?: string;
}

const FormList: React.FC<FormListProps> = ({
  control,
  fieldName,
  title,
  placeholder = "",
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });

  return (
    <Box>
      <Typography variant="h5">{title}:</Typography>
      {fields.map((field, index) => (
        <Box
          key={field.id}
          sx={{ display: "flex", alignItems: "center", mb: 2 }}
        >
          {fieldName == "instructions" && (
            <Box
              sx={{
                minWidth: "4rem",
                fontWeight: "bold",
                fontSize: { lg: "18px" },
                mr: { md: 2 },
              }}
            >
              Step {index + 1}
            </Box>
          )}
          <FormInput
            name={`${fieldName}.${index}.value`}
            control={control}
            defaultValue={field.value || ""}
            placeholder={placeholder}
            rules={{ required: `${title} is required` }}
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
        Add {title}
      </Button>
    </Box>
  );
};

export default FormList;
