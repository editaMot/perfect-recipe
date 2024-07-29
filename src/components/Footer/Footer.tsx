import { Box, Container, Divider } from "@mui/material";
import { LEGAL_LINKS } from "../../constants/LegalLinks";
import { QUICK_LINKS } from "../../constants/QuickLinks";
import Newsletter from "../Newsletter";
import FooterBottom from "./FooterBottom";
import FooterLinksGroup from "./FooterLinksGroup";
import LogoSection from "./LogoSection";

const Footer: React.FC = () => (
  <Box component="footer" sx={{ backgroundColor: "background.lightGrey" }}>
    <Container
      sx={{
        py: 4,
        px: { xl: 0 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: {
            sm: "space-between",
            md: "flex-start",
            xl: "space-between",
          },
          gap: { xs: 5, md: 6, xl: 5 },
          mb: 5,
        }}
      >
        <LogoSection />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignSelf: { xs: "center", sm: "flex-start" },
            justifyContent: { sm: "space-between" },
            gap: { xs: 5, sm: 8, md: 5 },
            width: { lg: "60%", xl: "50%" },
          }}
        >
          <FooterLinksGroup groupTitle="Quick links" links={QUICK_LINKS} />
          <FooterLinksGroup groupTitle="Legal" links={LEGAL_LINKS} />
        </Box>
        <Box
          sx={{
            display: {
              xs: "none",
              lg: "block",
            },
          }}
        >
          <Newsletter
            flexDirection="column"
            heading="Newsletter"
            details="Subscribe to our newsletter to get more free tip"
            footer={true}
          />
        </Box>
      </Box>
      <Divider />
      <FooterBottom />
    </Container>
  </Box>
);

export default Footer;
