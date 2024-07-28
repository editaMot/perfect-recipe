import { Box, InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

interface FormInputProps {
  type?: string;
  name: string;
  control: Control<FieldValues>;
  label?: string;
  defaultValue: string | number;
  placeholder?: string;
  rules?: RegisterOptions;
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
}) => {
  const [inputLength, setInputLength] = useState<number>(
    (defaultValue || "").toString().length
  );
  return (
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
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            type={type}
            id={name}
            fullWidth
            error={!!error}
            multiline
            helperText={
              <>
                {error ? error.message : ""}
                {maxLength && !error && ` ${inputLength}/${maxLength}`}
                {additionalInfo && !error && (
                  <Box
                    component="span"
                    sx={{ mt: 1, color: "secondary.light", fontSize: "12px" }}
                  >
                    {additionalInfo}
                  </Box>
                )}
              </>
            }
            placeholder={placeholder}
            inputProps={{
              maxLength,
              min: type === "number" ? 0 : undefined,
              max: type === "number" ? 59 : undefined,
            }}
            onChange={(e) => {
              setInputLength(e.target.value.length);
              field.onChange(e);
            }}
            value={field.value || ""}
          />
        )}
      />
    </Box>
  );
};

export default FormInput;
