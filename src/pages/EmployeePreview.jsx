import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import img2 from "../assets/images/img2.jpg";
// import img1 from "../assets/images/pp.jpg";
import HalfcutThumbnail from "../components/commons/HalfcutThumbnail";
import PreviewList from "../components/commons/PreviewList";

export default function EmployeePreview() {
  let { state } = useLocation();
  return (
    <Box>
      <HalfcutThumbnail name={ state?.name } bgImg={img2} ppImg={state?.image} />
      <PreviewList title="Email" subtitle={ state?.email } />
      <PreviewList
        title="address"
        subtitle={ state?.address }
      />
      <PreviewList title="Employee Role" subtitle={ state?.role } />
    </Box>
  );
}
