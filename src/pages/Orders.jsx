/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Paper } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from 'swr';
import HeadingTitle from "../components/commons/HeadingTitle";
import ModalCTAbtn from "../components/commons/ModalCTAbtn";
import OrderModal from "../components/orders/OrderModal";
import OrderTable from "../components/orders/OrderTable";
import { fetcher } from "../utility/fetcher";

const URL = process.env.ORDERS_ENDPOINT;

export default function Orders() {
  const [modalOpen, setModalOpen] = useState(false);
  
  const authToken = useSelector((state) => state?.authToken?.token);

  const { data: orders, error, isLoading } = useSWR([URL, authToken], ([URL, authToken]) => fetcher(URL, authToken?.access_token))
  const ordersData = orders?.orders;

  return (
    <>
      <Paper elevation={2} className="w-full flex justify-between items-center">
        <HeadingTitle HeadingLabel="Orders" />
        <ModalCTAbtn
          BtnLabel="Create Orders"
          OnModal={() => setModalOpen(true)}
        />
      </Paper>
      <OrderModal OpenModal={modalOpen} OffModal={() => setModalOpen(false)} />
      
      {isLoading && <h2>Loading...</h2>}
      {ordersData && <OrderTable orders={ordersData} />}
    </>
  );
}
