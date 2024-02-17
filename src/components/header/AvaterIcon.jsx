/* eslint-disable react/prop-types */
import { Avatar, IconButton, Tooltip } from "@mui/material";
// import { useSelector } from "react-redux";

export default function AvatarIcon({ handleOpenUserMenu }) {
  
  // const { access_token } = useSelector((state) => state.authToken.token);
  // const { userEmail, userRole } = access_token;
  // console.log(userEmail);
  // console.log(userRole);

  return (
    <Tooltip title="Open Avater">
      <IconButton onClick={handleOpenUserMenu}>
        <Avatar alt="Remy Sharp" src="" />
      </IconButton>
    </Tooltip>
  );
}
