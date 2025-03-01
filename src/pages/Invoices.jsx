/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Paper } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import HeadingTitle from "../components/commons/HeadingTitle";
import ModalCTAbtn from "../components/commons/ModalCTAbtn";
import InvoiceModal from "../components/invoices/InvoiceModal";
import InvoiceTable from "../components/invoices/InvoiceTable";
import { fetcher } from "../utility/fetcher";

const URL = process.env.INVOICES_ENDPOINT;

export default function Invoices() {
  const [modalOpen, setModalOpen] = useState(false);

  const authToken = useSelector((state) => state?.authToken?.token);

  const {
    data: invoices,
    error,
    isLoading,
  } = useSWR([URL, authToken], ([URL, authToken]) => fetcher(URL, authToken));
  const invoicesData = invoices?.invoices;

  return (
    <>
      <Paper elevation={2} className="w-full flex justify-between items-center">
        <HeadingTitle HeadingLabel="Invoices" />
        <ModalCTAbtn
          BtnLabel="Create Invoices"
          OnModal={() => setModalOpen(true)}
        />
      </Paper>
      <InvoiceModal
        OpenModal={modalOpen}
        OffModal={() => setModalOpen(false)}
      />

      {isLoading && <h2>Loading...</h2>}
      {invoicesData && <InvoiceTable invoices={invoicesData} />}
    </>
  );
}
