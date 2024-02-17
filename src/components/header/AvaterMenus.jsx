/* eslint-disable react/prop-types */
import { Menu, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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

       {/* <Link to={"/profile"}>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography className="text-center">
              Profile
            </Typography>
          </MenuItem>
        </Link> */}
        
       <Link to={"/dashboard"}>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography className="text-center">
              Dashboard
            </Typography>
          </MenuItem>
        </Link>
       <Link to={"/logout"}>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography className="text-center">
              Logout
            </Typography>
          </MenuItem>
        </Link>
    </Menu>
  );
}
