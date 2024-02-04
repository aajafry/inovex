/* eslint-disable react/prop-types */
import { Menu, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const avaterOptions = ["Profile", "Dashboard", "Logout"];

export default function AvatarMenus({ anchorElUser, handleCloseUserMenu }) {
  return (
    <Menu
      className="mt-16"
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      {avaterOptions.map((option, index) => (
        <MenuItem key={index} onClick={handleCloseUserMenu}>
          <Typography className="text-center">
            <Link to={"/" + option.toLowerCase()}>{option}</Link>
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );
}
