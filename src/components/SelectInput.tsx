import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import {
  RecipeFormData,
  RecipeFormFieldNames,
} from "../types/recipeFormDataTypes";
import { ValidationRules } from "../types/recipeFormValidationRulesTypes";

interface SelectInputProps {
  control: Control<RecipeFormData>;
  name: RecipeFormFieldNames;
  label: string;
  options: string[];
  defaultValue?: string | string[];
  rules: ValidationRules;
  multipleSelect?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  control,
  name,
  label,
  options,
  defaultValue = "",
  rules,
  multipleSelect = false,
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    rules={rules}
    render={({ field, fieldState: { error } }) => (
      <FormControl fullWidth error={!!error}>
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Select
          {...field}
          labelId={`${name}-label`}
          label={label}
          multiple={multipleSelect}
          value={field.value || (multipleSelect ? [] : "")}
          onChange={(e) => {
            const value = multipleSelect ? e.target.value : e.target.value;
            field.onChange(value);
          }}
        >
          {!multipleSelect && (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          )}
          {options.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{error.message}</FormHelperText>}
      </FormControl>
    )}
  />
);

export default SelectInput;
