/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function AppsLogo({ BrandName }) {
  return (
    <Typography variant="h4" className="text-nowrap tracking-wide">
      <Link to="/">{BrandName}</Link>
    </Typography>
  );
}
