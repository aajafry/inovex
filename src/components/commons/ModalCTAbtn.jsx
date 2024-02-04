/* eslint-disable react/prop-types */
import { Button } from "@mui/material";

export default function ModalCTAbtn({ BtnLabel, OnModal }) {
  return (
    <Button
      variant="contained"
      className="m-3 font-semibold text-nowrap"
      onClick={OnModal}
      size="small"
    >
      {BtnLabel}
    </Button>
  );
}
