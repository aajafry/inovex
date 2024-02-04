import { Box } from "@mui/material";
import { useState } from "react";
import AvatarIcon from "./AvaterIcon";
import AvatarMenus from "./AvaterMenus";

export default function AvaterSettings() {
  const [anchorElUser, setAnchorElUser] = useState(null);

  return (
    <Box>
      <AvatarIcon
        handleOpenUserMenu={() => setAnchorElUser(event.currentTarget)}
      />

      <AvatarMenus
        anchorElUser={anchorElUser}
        handleCloseUserMenu={() => setAnchorElUser(null)}
      />
    </Box>
  );
}
