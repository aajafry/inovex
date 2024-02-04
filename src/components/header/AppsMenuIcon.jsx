/* eslint-disable react/prop-types */
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

export default function AppsMenuIcon({ open, handleDrawerOpen }) {
  return (
    <IconButton
      className="text-inherit mr-1  ml-0"
      aria-label="open drawer"
      onClick={handleDrawerOpen}
      edge="start"
      sx={{
        ...(open && { display: "none" }),
      }}
    >
      <MenuIcon />
    </IconButton>
  );
}
