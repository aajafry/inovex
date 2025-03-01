/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Box, Grid, Paper } from "@mui/material";
import HeadingTitle from "../components/commons/HeadingTitle";
import {
  ClientWidget,
  OrderWidget,
  OrdersTableWidget,
  RevenueWidget,
  TicketsTableWidget,
} from "../components/dashboard/index";

import { useSelector } from "react-redux";
import useSWR from "swr";
import { fetcher } from "../utility/fetcher";

const CLIENTS_URL = process.env.USERS_ENDPOINT;
const ORDERS_URL = process.env.ORDERS_ENDPOINT;
const INVOICES_URL = process.env.INVOICES_ENDPOINT;
const TICKETS_URL = process.env.TICKETS_ENDPOINT;

export default function Dashboard() {
  const authToken = useSelector((state) => state?.authToken?.token);
  // clients info. fetcher
  const { data: clients } = useSWR(
    [CLIENTS_URL, authToken],
    ([CLIENTS_URL, authToken]) => fetcher(CLIENTS_URL, authToken)
  );
  const clientsData = clients?.users?.filter((user) => user?.role === "Client");

  // orders info. fetcher
  const { data: orders } = useSWR(
    [ORDERS_URL, authToken],
    ([ORDERS_URL, authToken]) => fetcher(ORDERS_URL, authToken)
  );
  const ordersData = orders?.orders;

  // invoices info. fetcher
  const { data: invoices } = useSWR(
    [INVOICES_URL, authToken],
    ([INVOICES_URL, authToken]) => fetcher(INVOICES_URL, authToken)
  );
  const invoicesData = invoices?.invoices;

  const RevenueArray = invoicesData?.map((invoice) => invoice?.totalAmt);
  const RevenueReducer = RevenueArray?.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  // tickets info. fetcher
  const {
    data: tickets,
    error,
    isLoading,
  } = useSWR([TICKETS_URL, authToken], ([TICKETS_URL, authToken]) =>
    fetcher(TICKETS_URL, authToken)
  );
  const ticketsData = tickets?.tickets;

  return (
    <Box>
      <Paper elevation={2} className="w-full flex justify-between items-center">
        <HeadingTitle HeadingLabel="Dashboard" />
      </Paper>

      <Grid container spacing={2} className=" m-0 mb-24 pr-8">
        <Grid item xs={6} md={4}>
          <RevenueWidget totalRevenue={RevenueReducer} />
        </Grid>
        <Grid item xs={6} md={4}>
          <ClientWidget numberOfClient={clientsData?.length} />
        </Grid>
        <Grid item xs={6} md={4}>
          <OrderWidget numberOfOrder={ordersData?.length} />
        </Grid>

        <Grid item xs={12}>
          {ticketsData && <TicketsTableWidget tickets={ticketsData} />}
        </Grid>

        <Grid item xs={12}>
          {ordersData && <OrdersTableWidget orders={ordersData} />}
        </Grid>
      </Grid>
    </Box>
  );
}
