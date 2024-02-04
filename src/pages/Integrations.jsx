import { Paper } from "@mui/material";
import HeadingTitle from "../components/commons/HeadingTitle";

export default function Integrations() {
  return (
    <>
      <Paper elevation={2} className="w-full flex justify-between items-center">
        <HeadingTitle HeadingLabel="Integrations" />
      </Paper>
    </>
  );
}
