/* eslint-disable react/prop-types */
import { Divider } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import OrderForm from "./OrderForm";

export default function OrderModal({ OpenModal, OffModal }) {
  return (
    <Modal
      open={OpenModal}
      onClose={OffModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={OpenModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            height: "90%",
            width: "60%",
            overflowY: "scroll",
          }}
        >
          <Typography id="transition-modal-title" variant="h6" component="h4">
            Create Order
          </Typography>
          <Divider sx={{ marginY: 1.5 }} />
          <OrderForm />
        </Box>
      </Fade>
    </Modal>
  );
}
