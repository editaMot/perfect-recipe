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
    {error ? (
      <>{error.message}</>
    ) : (
      <>
        {maxLength && `${inputLength}/${maxLength}`}
        {additionalInfo && ` ${additionalInfo}`}
      </>
    )}
  </>
);

export default HelperText;
