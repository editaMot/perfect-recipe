import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import XIcon from "@mui/icons-material/X";
import { IconButton, Link } from "@mui/material";

const SocialMedia = () => {
  const icons = [
    { component: FacebookIcon, name: "Facebook" },
    { component: InstagramIcon, name: "Instagram" },
    { component: PinterestIcon, name: "Pinterest" },
    { component: LinkedInIcon, name: "LinkedIn" },
    { component: XIcon, name: "X" },
  ];

  return (
    <>
      {icons.map((icon) => {
        const IconComponent = icon.component;
        return (
          <Link
            key={icon.name}
            href={`https://${icon.name}.com`}
            target="_blank"
          >
            <IconButton>
              <IconComponent />
            </IconButton>
          </Link>
        );
      })}
    </>
  );
};

export default SocialMedia;
