import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { Button } from "@mui/material";

const PrintButton: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button
      variant="outlined"
      startIcon={<LocalPrintshopIcon />}
      onClick={handlePrint}
      sx={{ px: 4, py: 1.5 }}
    >
      Print Recipe
    </Button>
  );
};

export default PrintButton;
