import { Box, Grid, List, Paper } from "@mui/material";
// import img2 from "../assets/images/img2.jpg";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import moment from 'moment';
import { useLocation } from "react-router-dom";
import PreviewBrif from "../components/commons/PreviewBrif";
import PreviewHeader from "../components/commons/PreviewHeader";
import PreviewProperty from "../components/commons/PreviewProperty";
import PreviewThumbnail from "../components/commons/PreviewThumbnail";

export default function QuotationPreview() {
  let { state } = useLocation();

  const brif = <div
    dangerouslySetInnerHTML={{__html: state?.brif}}
  />
  return (
    <Box>
      <PreviewHeader label={`Quotation ID: ${state?._id.slice(0,6)}`} />
      <PreviewThumbnail src={state?.attachment} alt={`${state?.service?.name}-${state?._id.slice(0,6)}`} />
      <Box className="mt-4 pr-4 mb-28">
        <Grid container spacing={2} className="w-full m-0">
          <Grid item xs={8}>
            <PreviewBrif
              title="Quotation Brif"
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
                  icon={<DesignServicesIcon />}
                  title="Service Name"
                  subtitle={state?.service?.name}
                />
                <PreviewProperty
                  icon={<ScheduleIcon />}
                  title="Kick off Date"
                  subtitle={moment(state?.openedAt).format("MMM DD, YYYY")}
                />
                <PreviewProperty
                  icon={<TaskAltIcon />}
                  title="End Date"
                  subtitle={moment(state?.completedAt).format("MMM DD, YYYY")}
                />
                <PreviewProperty
                  icon={<ProductionQuantityLimitsIcon />}
                  title="Quantity"
                  subtitle={state?.quantity}
                />
                <PreviewProperty
                  icon={<AttachMoneyIcon />}
                  title="Budget"
                  subtitle={state?.budget}
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
