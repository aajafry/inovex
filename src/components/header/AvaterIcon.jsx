/* eslint-disable react/prop-types */
import { Avatar, IconButton, Tooltip } from "@mui/material";

export default function AvatarIcon({ handleOpenUserMenu }) {
  return (
    <Tooltip title="Open Avater">
      <IconButton onClick={handleOpenUserMenu}>
        <Avatar alt="Remy Sharp" src="" />
      </IconButton>
    </Tooltip>
  );
}
