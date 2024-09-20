import { TextField } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface CommentTextfieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  required?: boolean;
}

const CommentTextfield = <T extends FieldValues>({
  control,
  name,
  required = false,
}: CommentTextfieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    rules={required ? { required: "Comment is required" } : undefined}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        placeholder="Type in here…"
        minRows={3}
        error={!!error}
        helperText={error ? error.message : null}
        multiline
        variant="outlined"
        color="primary"
        sx={{ width: "100%" }}
      />
    )}
  />
);

export default CommentTextfield;
