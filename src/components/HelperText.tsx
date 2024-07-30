interface HelperTextProps {
  error?: { message?: string; type?: string };
  maxLength?: number;
  inputLength: number;
  additionalInfo?: string;
}

const HelperText: React.FC<HelperTextProps> = ({
  error,
  maxLength,
  inputLength,
  additionalInfo,
}) => (
  <>
    {error ? error.message : ""}
    {maxLength && !error && ` ${inputLength}/${maxLength}`}
    {additionalInfo && !error ? additionalInfo : ""}
  </>
);

export default HelperText;
