import { Box, Grid, List, Paper } from "@mui/material";
import img3 from "../assets/images/img3.jpg";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EventIcon from "@mui/icons-material/Event";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import moment from "moment";
import { useLocation } from "react-router-dom";
import PreviewBrif from "../components/commons/PreviewBrif";
import PreviewHeader from "../components/commons/PreviewHeader";
import PreviewProperty from "../components/commons/PreviewProperty";
import PreviewThumbnail from "../components/commons/PreviewThumbnail";

export default function TicketPreview() {
  let { state } = useLocation();
  
  const brif = <p
    dangerouslySetInnerHTML={{__html: state?.brif}}
  />
  return (
    <Box>
      <PreviewHeader label={`Ticket ID: ${state?._id.slice(0,6)}`} />
      <PreviewThumbnail src={img3} alt={state?._id.slice(0,6)} />
      <Box className="mt-4 pr-4 mb-28">
        <Grid container spacing={2} className="w-full m-0">
          <Grid item xs={8}>
            <PreviewBrif
              title={state?.subject}
              body={brif}
            />
          </Grid>
          <Grid item xs={4}>
            <Paper 
              elevation={2} 
              className="p-4"
              sx={{ backgroundColor: "secondary.main", color: "info.main"}}
            >
              Properties
              <List>
                <PreviewProperty
                  icon={<AccountCircleIcon />}
                  title="Client Name"
                  subtitle={state?.client?.name}
                />
                <PreviewProperty
                  icon={<EventIcon />}
                  title="Created"
                  subtitle={moment(state?.createdAt).format("MMM DD, YYYY")}
                />
                <PreviewProperty
                  icon={<Grid3x3Icon />}
                  title="Order ID"
                  subtitle={state?.order?._id.slice(0, 6)}
                />
                <PreviewProperty
                  icon={<PriorityHighIcon />}
                  title="Priority"
                  subtitle={state?.priority}
                />
                <PreviewProperty
                  icon={<MoreHorizIcon />}
                  title="Status"
                  subtitle={state?.status}
                />
                <PreviewProperty
                  icon={<AssignmentIndIcon />}
                  title="Assigned To"
                  subtitle={state?.manager?.name}
                />
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
