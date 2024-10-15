import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface ControlledTextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  required?: boolean;
  label: string;
  type?: string;
  rules?: object;
  textFieldProps?: TextFieldProps;
}

const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  required = false,
  label,
  type = "text",
  rules = {},
  textFieldProps = {},
}: ControlledTextFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    rules={{
      required: required ? `${label} is required` : undefined,
      ...rules,
    }}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        type={type}
        label={label}
        error={!!error}
        helperText={error ? error.message : null}
        variant="outlined"
        onChange={(e) => {
          field.onChange(e);
        }}
        value={field.value || ""}
        fullWidth
        {...textFieldProps}
      />
    )}
  />
);

export default ControlledTextField;
