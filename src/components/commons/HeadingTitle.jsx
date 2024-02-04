/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";

export default function HeadingTitle({ HeadingLabel }) {
  return (
    <Typography variant="button" className="p-4 font-semibold capitalize">
      {HeadingLabel}
    </Typography>
  );
}
