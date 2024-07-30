import { Box, InputLabel } from "@mui/material";
import { Control, FieldValues } from "react-hook-form";
import FormInput, { ValidationRules } from "./FormInput";

interface TimeInputProps {
  name: { hoursName: string; minutesName: string };
  label: string;
  additionalInfo?: string;
  control: Control<FieldValues>;
  defaultValues: { hours: number; minutes: number };
  rules?: {
    hours?: ValidationRules;
    minutes?: ValidationRules;
  };
}

const TimeInput: React.FC<TimeInputProps> = ({
  name,
  label,
  additionalInfo,
  control,
  defaultValues,
  rules = {},
}) => (
  <Box>
    <InputLabel
      sx={{
        mb: 1,
        color: "#000",
        fontSize: { xs: "18px", sm: "20px", md: "22px", lg: "24px" },
      }}
    >
      {label}
    </InputLabel>
    <Box display="flex" gap={2}>
      <FormInput
        name={name.hoursName}
        control={control}
        defaultValue={defaultValues.hours}
        placeholder="Hours"
        type="number"
        rules={rules.hours}
        additionalInfo={additionalInfo}
      />
      <FormInput
        name={name.minutesName}
        control={control}
        defaultValue={defaultValues.minutes}
        placeholder="Minutes"
        type="number"
        rules={rules.minutes}
      />
    </Box>
  </Box>
);

export default TimeInput;
