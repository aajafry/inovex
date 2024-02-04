/* eslint-disable react/prop-types */
import { Box, Toolbar } from "@mui/material";
import AppsLogo from "./AppsLogo";
import AppsMenuIcon from "./AppsMenuIcon";
import AvaterSettings from "./AvaterSettings";

export default function Header({ open, handleDrawerOpen }) {
  return (
    <Toolbar className="flex justify-between items-center">
      <Box className="flex items-center">
        <AppsMenuIcon open={open} handleDrawerOpen={handleDrawerOpen} />
        <AppsLogo BrandName="INOVEX" />
      </Box>
      <AvaterSettings />
    </Toolbar>
  );
}
