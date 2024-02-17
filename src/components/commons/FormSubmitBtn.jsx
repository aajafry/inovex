/* eslint-disable react/prop-types */
import { Button } from "@mui/material";

export default function FormSubmitBtn({ label, isdisabled }) {
  return (
    <Button
      variant="contained"
      className="m-3 font-semibold text-nowrap mx-auto"
      size="medium"
      type="submit"
      disabled={isdisabled}
      sx={{ display: "flex", m: "0 auto", marginTop: 2 }}
    >
      {label ? label : "submit"}
    </Button>
  );
}
