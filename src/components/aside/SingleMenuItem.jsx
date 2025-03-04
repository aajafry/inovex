/* eslint-disable react/prop-types */
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function SingleMenuItem({ ItemName, ItemIcon }) {
  return (
    <ListItem className="block p-0">
      <Link to={"/" + ItemName.toLowerCase()}>
        <ListItemButton
          className=" min-h-full px-4 py-1"
          sx={{
            justifyContent: open ? "initial" : "center",
          }}
        >
          <ListItemIcon
            className=" min-w-0 justify-center"
            sx={{ mr: open ? 3 : "auto" }}
          >
            {ItemIcon}
          </ListItemIcon>
          <ListItemText primary={ItemName} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
}
