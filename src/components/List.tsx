import SquareIcon from "@mui/icons-material/Square";
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  List as ListMUI,
  Typography,
} from "@mui/material";

interface ListProps {
  list: string[];
  title: string;
  icon?: boolean;
}

const List: React.FC<ListProps> = ({ list, title, icon = false }) => (
  <>
    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
      {title}
    </Typography>
    <ListMUI disablePadding sx={{ mb: 3 }}>
      {list.map((item, index) => (
        <ListItem key={item} disableGutters sx={{ pb: 0 }}>
          <ListItemIcon sx={{ minWidth: "2rem" }}>
            {icon ? (
              <SquareIcon color="primary" sx={{ fontSize: "1rem" }} />
            ) : (
              <Box
                sx={{
                  px: 1,
                  backgroundColor: "primary.light",
                  borderRadius: 1,
                  mr: 2,
                }}
              >
                <Typography
                  sx={{
                    color: "primary.contrastText",
                  }}
                >
                  {index + 1}
                </Typography>
              </Box>
            )}
          </ListItemIcon>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </ListMUI>
  </>
);

export default List;
