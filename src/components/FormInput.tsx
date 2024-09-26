import { Box, InputLabel, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import {
  RecipeFormData,
  RecipeFormFieldNames,
} from "../types/recipeFormDataTypes";
import { ValidationRules } from "../types/recipeFormValidationRulesTypes";
import HelperText from "./HelperText";

interface FormInputProps {
  type?: string;
  name: RecipeFormFieldNames;
  control: Control<RecipeFormData>;
  label?: string;
  defaultValue?: string | number;
  placeholder?: string;
  rules: ValidationRules;
  maxLength?: number;
  additionalInfo?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  type = "text",
  name,
  control,
  label,
  rules,
  defaultValue,
  placeholder,
  maxLength,
  additionalInfo,
}) => (
  <Box sx={{ width: "100%" }}>
    <InputLabel
      htmlFor={name}
      sx={{
        mb: 1,
        color: "#000",
        fontSize: { xs: "18px", sm: "20px", md: "22px", lg: "24px" },
      }}
    >
      {label}
    </InputLabel>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const currentInputLength = (field.value || "").toString().length;
        return (
          <TextField
            {...field}
            type={type}
            id={name}
            fullWidth
            error={!!error}
            multiline
            helperText={
              <HelperText
                error={error}
                maxLength={maxLength}
                inputLength={currentInputLength}
                additionalInfo={additionalInfo}
              />
            }
            placeholder={placeholder}
            inputProps={{
              maxLength,
              min: type === "number" ? 0 : undefined,
              max: type === "number" ? 59 : undefined,
            }}
            onChange={(e) => {
              field.onChange(e);
            }}
            value={field.value || ""}
          />
        );
      }}
    />
  </Box>
);

export default FormInput;
