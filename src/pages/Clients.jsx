/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Paper } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import ClientModal from "../components/clients/ClientModal";
import ClientTable from "../components/clients/ClientTable";
import HeadingTitle from "../components/commons/HeadingTitle";
import ModalCTAbtn from "../components/commons/ModalCTAbtn";
import { fetcher } from "../utility/fetcher";

const URL = process.env.USERS_ENDPOINT;

export default function Clients() {
  const [modalOpen, setModalOpen] = useState(false);

  const authToken = useSelector((state) => state?.authToken?.token);

  const {
    data: clients,
    error,
    isLoading,
  } = useSWR([URL, authToken], ([URL, authToken]) => fetcher(URL, authToken));
  const clientsData = clients?.users?.filter((user) => user?.role === "Client");

  return (
    <>
      <Paper
        elevation={2}
        className="w-full flex justify-between items-center overflow-hidden"
      >
        <HeadingTitle HeadingLabel="Clients" />
        <ModalCTAbtn
          BtnLabel="Create Clients"
          OnModal={() => setModalOpen(true)}
        />
      </Paper>

      <ClientModal OpenModal={modalOpen} OffModal={() => setModalOpen(false)} />

      {isLoading && <h2>Loading...</h2>}
      {clientsData && <ClientTable clients={clientsData} />}
    </>
  );
}
