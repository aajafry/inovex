/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Box, Grid, Paper } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from 'swr';
import HeadingTitle from "../components/commons/HeadingTitle";
import ModalCTAbtn from "../components/commons/ModalCTAbtn";
import ServiceCard from "../components/services/ServiceCard";
import ServiceModal from "../components/services/ServiceModal";
import { fetcher } from "../utility/fetcher";

const URL = process.env.SERVICES_ENDPOINT;

export default function Services() {
  const [modalOpen, setModalOpen] = useState(false);

  const authToken = useSelector((state) => state?.authToken?.token);

  const { data: services, error, isLoading } = useSWR([URL, authToken], ([URL, authToken]) => fetcher(URL, authToken?.access_token))

  return (
    <Box>
      <Paper elevation={2} className="w-full flex justify-between items-center">
        <HeadingTitle HeadingLabel="Services" />
        <ModalCTAbtn
          BtnLabel="Create Service"
          OnModal={() => setModalOpen(true)}
        />
      </Paper>

      <ServiceModal
        OpenModal={modalOpen}
        OffModal={() => setModalOpen(false)}
      />

      <Grid container spacing={3} className=" w-full mx-0 mt-4 mb-24 pr-4">

      {isLoading && <h2>Loading...</h2> } 
      {services?.services?.map((service, index) => (
        <Grid key={index} item md={4} sm={6} sx={1}>
          <Paper>
            <ServiceCard service={service}/>
          </Paper>
        </Grid>
      ))}
      </Grid>
    </Box>
  );
}
