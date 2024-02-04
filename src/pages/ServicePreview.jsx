/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaymentsIcon from "@mui/icons-material/Payments";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { Box, Grid, List, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import PreviewBrif from "../components/commons/PreviewBrif";
import PreviewHeader from "../components/commons/PreviewHeader";
import PreviewProperty from "../components/commons/PreviewProperty";
import PreviewThumbnail from "../components/commons/PreviewThumbnail";
import { fetcher } from "../utility/fetcher";

const URL = process.env.SERVICES_ENDPOINT;

export default function ServicePreview() {

  let { slug } = useParams();

  const authToken = useSelector((state) => state.authToken.token);

  const { data: services, error, isLoading } = useSWR([`${URL}/${slug}`, authToken], ([URL, authToken]) => fetcher(URL, authToken.access_token))

  const brif = <div
    dangerouslySetInnerHTML={{__html: services?.services?.brif}}
  />
  console.log(services?.services?.attachment[0]?.preview);
  return (
    <Box>
      <PreviewHeader label={services?.services?.name} />
      <PreviewThumbnail src={services?.services?.attachment[0]?.path} alt={services?.services?.name} />
      <Box className="mt-4 pr-4 mb-28">
        <Grid container spacing={2} className="w-full m-0">
          <Grid item xs={8}>
            <PreviewBrif
              title="Servise Brif"
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
                  icon={<PaymentsIcon />}
                  title="Pricing"
                  subtitle={services?.services?.paymentTerm}
                />
                <PreviewProperty
                  icon={<AttachMoneyIcon />}
                  title="USD"
                  subtitle={services?.services?.price}
                />
                <PreviewProperty
                  icon={<ProductionQuantityLimitsIcon />}
                  title="Quantity"
                  subtitle={services?.services?.invoice?.length}
                />
                <PreviewProperty
                  icon={<AccessTimeIcon />}
                  title="Duration"
                  subtitle={services?.services?.duration}
                />
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
