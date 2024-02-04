import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Divider, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import AsideMenuItems from "./AsideMenuItems";

// eslint-disable-next-line react/prop-types
export default function AsideDrawer({ handleDrawerClose }) {
  return (
    <Paper 
      className=" h-screen rounded-none"
      sx={{ backgroundColor: "secondary.main", color: "info.main"}}
    >
      <Toolbar className="w-full flex justify-between items-center">
        <Typography
          variant="h6"
          className="text-nowrap font-medium tracking-wide uppercase"
        >
          Fetures
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <AsideMenuItems />
    </Paper>
  );
}
