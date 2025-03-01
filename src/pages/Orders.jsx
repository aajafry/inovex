/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";
import { Button, Paper } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import HeadingTitle from "../components/commons/HeadingTitle";
import ModalCTAbtn from "../components/commons/ModalCTAbtn";
import KanbanBoard from "../components/orders/KanbanBoard";
import OrderModal from "../components/orders/OrderModal";
import OrderTable from "../components/orders/OrderTable";
import { fetcher } from "../utility/fetcher";

const URL = process.env.ORDERS_ENDPOINT;

export default function Orders() {
  const [modalOpen, setModalOpen] = useState(false);
  const [preview, setPreview] = useState(false);

  const authToken = useSelector((state) => state?.authToken?.token);

  const {
    data: orders,
    error,
    isLoading,
  } = useSWR([URL, authToken], ([URL, authToken]) => fetcher(URL, authToken));
  const ordersData = orders?.orders;

  return (
    <>
      <Paper
        elevation={2}
        className="w-full flex justify-between items-center overflow-hidden"
      >
        <HeadingTitle HeadingLabel="Orders" />
        <ModalCTAbtn
          BtnLabel="Create Orders"
          OnModal={() => setModalOpen(true)}
        />
      </Paper>

      <Paper
        elevation={2}
        className="w-full flex justify-start items-center p-2 cursor-pointer overflow-hidden"
      >
        <Button
          className=" bg-inherit text-slate-800"
          onClick={() => setPreview(true)}
        >
          <GridViewIcon className=" mr-2" /> Grid View
        </Button>
        <Button
          className=" bg-inherit text-slate-800"
          onClick={() => setPreview(false)}
        >
          <ListIcon className=" mr-2" /> List View
        </Button>
      </Paper>

      <OrderModal OpenModal={modalOpen} OffModal={() => setModalOpen(false)} />

      {isLoading && <h2>Loading...</h2>}
      {preview && <KanbanBoard orders={ordersData} />}
      {!preview && <OrderTable orders={ordersData} />}
    </>
  );
}
