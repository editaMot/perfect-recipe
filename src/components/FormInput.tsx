import { Box, InputLabel, TextField } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";
import HelperText from "./HelperText";

export interface ValidationRules {
  required?: boolean | string;
  maxLength?: { value: number; message: string };
  minLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: (value: string | number) => boolean | string;
}

interface FormInputProps {
  type?: string;
  name: string;
  control: Control<FieldValues>;
  label?: string;
  defaultValue: string | number;
  placeholder?: string;
  rules?: ValidationRules;
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
