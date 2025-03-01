/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Paper } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import HeadingTitle from "../components/commons/HeadingTitle";
import ModalCTAbtn from "../components/commons/ModalCTAbtn";
import TicketModal from "../components/tickets/TicketModal";
import TicketTable from "../components/tickets/TicketTable";
import { fetcher } from "../utility/fetcher";

const URL = process.env.TICKETS_ENDPOINT;

export default function Tickets() {
  const [modalOpen, setModalOpen] = useState(false);

  const authToken = useSelector((state) => state?.authToken?.token);

  const {
    data: tickets,
    error,
    isLoading,
  } = useSWR([URL, authToken], ([URL, authToken]) => fetcher(URL, authToken));
  const ticketsData = tickets?.tickets;

  return (
    <>
      <Paper elevation={2} className="w-full flex justify-between items-center">
        <HeadingTitle HeadingLabel="Tickets" />
        <ModalCTAbtn
          BtnLabel="Create Tickets"
          OnModal={() => setModalOpen(true)}
        />
      </Paper>

      <TicketModal OpenModal={modalOpen} OffModal={() => setModalOpen(false)} />

      {isLoading && <h2>Loading...</h2>}
      {ticketsData && <TicketTable tickets={ticketsData} />}
    </>
  );
}
