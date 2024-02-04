import { Paper } from "@mui/material";
import HeadingTitle from "../components/commons/HeadingTitle";

export default function Files() {
  return (
    <>
      <Paper elevation={2} className="w-full flex justify-between items-center">
        <HeadingTitle HeadingLabel="Files" />
      </Paper>
    </>
  );
}
