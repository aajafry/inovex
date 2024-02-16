/* eslint-disable react/prop-types */
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReceiptIcon from "@mui/icons-material/Receipt";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {

  return (
    <Card>
      <CardHeader
        title={ service.name }
        titleTypographyProps={{ variant: "h6" }}
        className=" py-4 px-2"
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />

      <CardMedia
        component="img"
        className=" h-40"
        image={service?.attachment}
        alt={ service.name }
      />

      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" className="mb-4">
        <div
          dangerouslySetInnerHTML={{__html: service.brif.slice(0, 70)}}
        />
        </Typography>
        <Paper elevation={0} className=" inline-flex items-center text-nowrap">
          <Box className=" inline-flex">
            <AccessTimeIcon className="mx-1" />
            <Typography>{ service.duration }</Typography>
          </Box>
          <Box className=" inline-flex">
            <ReceiptIcon className="mx-1" />
            <Typography>{service.invoice?.length}</Typography>
          </Box>
        </Paper>

        <Divider className="my-6" />

        <Box className="flex justify-between items-center">
          <Link to={`/servicePreview/${service._id}`}>
            <Button
              variant="contained"
              className="text-xs font-medium text-nowrap capitalize tracking-normal"
            >
              Learn More
            </Button>
          </Link>
          <Typography>{service.price}$</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
