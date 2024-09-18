import { Toaster } from "react-hot-toast";

const ToasterConfig: React.FC = () => (
  <Toaster
    position="top-center"
    gutter={15}
    containerStyle={{ margin: "8px" }}
    toastOptions={{
      success: {
        duration: 3000,
      },
      error: {
        duration: 3000,
      },
      style: {
        fontSize: "16px",
        maxWidth: "500px",
        padding: "16px 24px",
        backgroundColor: "background.default",
      },
    }}
  />
);

export default ToasterConfig;
