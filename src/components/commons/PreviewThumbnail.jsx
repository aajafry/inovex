/* eslint-disable react/prop-types */
import { Box } from "@mui/material";

export default function PreviewThumbnail({ src, alt }) {
  return (
    <Box>
      <img src={src} alt={alt} className=" h-40 w-full object-cover" />
    </Box>
  );
}
