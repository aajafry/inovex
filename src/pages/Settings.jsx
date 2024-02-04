/* eslint-disable react/prop-types */
import { Box, Paper, Tab } from "@mui/material";
import { useState } from "react";
import HeadingTitle from "../components/commons/HeadingTitle";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { About, Theme, Trams } from "../components/settings/Index";

export default function Settings() {
  const [tab, setTab] = useState("theme");

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box>
      <Paper elevation={2} className="flex justify-between items-center">
        <HeadingTitle HeadingLabel="Settings" />
      </Paper>

      <TabContext sx={{ width: "100%", typography: "body1" }} value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Theme" value="theme" />
            <Tab label="Trams" value="trams" />
            <Tab label="About" value="about" />
          </TabList>
        </Box>
        <TabPanel value="theme">
          <Theme />
        </TabPanel>
        <TabPanel value="trams">
          <Trams />
        </TabPanel>
        <TabPanel value="about">
          <About />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
