import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";
import { ValidationRules } from "../types/recipeFormValidationRulesTypes";

interface SelectInputProps {
  control: Control<FieldValues>;
  name: string;
  label: string;
  options: string[];
  defaultValue?: string;
  rules?: ValidationRules;
}

const SelectInput: React.FC<SelectInputProps> = ({
  control,
  name,
  label,
  options,
  defaultValue = "",
  rules,
}) => {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={rules}
          render={({ field, fieldState: { error } }) => (
            <Select
              {...field}
              labelId={`${name}-label`}
              label={label}
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {options.map((option) => (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              ))}
              {error && <FormHelperText>{error.message}</FormHelperText>}
            </Select>
          )}
        />
      </FormControl>
    </Box>
  );
};

export default SelectInput;
