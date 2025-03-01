/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Paper } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import HeadingTitle from "../components/commons/HeadingTitle";
import ModalCTAbtn from "../components/commons/ModalCTAbtn";
import QuotationModal from "../components/quotations/QuotationModal";
import QuotationTable from "../components/quotations/QuotationTable";
import { fetcher } from "../utility/fetcher";

const URL = process.env.QUOTATIONS_ENDPOINT;

export default function Quotations() {
  const [modalOpen, setModalOpen] = useState(false);

  const authToken = useSelector((state) => state.authToken?.token);

  const {
    data: quotations,
    error,
    isLoading,
  } = useSWR([URL, authToken], ([URL, authToken]) => fetcher(URL, authToken));
  const quotationsData = quotations?.quotations;

  return (
    <>
      <Paper elevation={2} className="w-full flex justify-between items-center">
        <HeadingTitle HeadingLabel="Quotations" />
        <ModalCTAbtn
          BtnLabel="Create Quotations"
          OnModal={() => setModalOpen(true)}
        />
      </Paper>

      <QuotationModal
        OpenModal={modalOpen}
        OffModal={() => setModalOpen(false)}
      />

      {isLoading && <h2>Loading...</h2>}
      {quotations && <QuotationTable quotations={quotationsData} />}
    </>
  );
}
