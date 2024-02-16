/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import moment from 'moment';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useSWR from 'swr';
import PreviewHeader from "../components/commons/PreviewHeader";
import { fetcher } from "../utility/fetcher";


const URL = process.env.COMPANY_ENDPOINT;

export default function InvoicePreview() {
  let { state } = useLocation();

  const authToken = useSelector((state) => state.authToken.token);

  const { data: company, error, isLoading } = useSWR([URL, authToken], ([URL, authToken]) => fetcher(URL, authToken?.access_token))

  const note = <Box>{state?.note}</Box>

  return (
    <Box>
      <PreviewHeader label="" />
      <Paper className="my-4 px-2 py-8 mb-28">
        <Box className="my-2  mx-4">
          <Typography variant="subtitle2" className=" font-semibold">
            {" "}
            Invoice ID{" "}
          </Typography>
          <Typography variant="body2"> {state?._id.slice(0,6)} </Typography>
        </Box>

        <Box className=" mx-4 flex justify-between items-end">
          <Box className="text-left">
            <Typography variant="body1"> Billed To </Typography>
            <Typography variant="body1">{state?.client?.name}</Typography>
            <Typography variant="body1">{state?.client?.city}, {state?.client?.state}</Typography>
            <Typography variant="body1">{state?.client?.country}, {state?.client?.zip}</Typography>
          </Box>

          <Box className="flex flex-col items-end">
            <Avatar>
              <img src={company?.company[0]?.logo} alt={company?.company[0]?.name} className="object-cover" />
            </Avatar>
            <Typography variant="body1">{company?.company[0]?.name}</Typography>
            <Typography variant="body1">{company?.company[0]?.email}</Typography>
            <Typography variant="body1"> 
              {company?.company[0]?.city + " " + company?.company[0]?.state}
            </Typography>
            <Typography variant="body1"> 
              {company?.company[0]?.country + " " + company?.company[0]?.zip} 
            </Typography>
          </Box>
        </Box>

        <Grid
          container
          spacing={1}
          component={Paper}
          className="my-10 py-4 flex items-center text-center w-full m-0"
        >
          <Grid item xs={3} className=" border-e-2 ">
            <Typography variant="button" className=" font-semibold">
              {" "}
              Service Name{" "}
            </Typography>
            <Typography variant="body2">{state?.service?.name}</Typography>
          </Grid>
          <Grid item xs={3} className=" border-e-2">
            <Typography variant="button" className=" font-semibold">
              {" "}
              Order ID{" "}
            </Typography>
            <Typography variant="body2">{state?.order?._id.slice(0,6)}</Typography>
          </Grid>
          <Grid item xs={3} className=" border-e-2">
            <Typography variant="button" className=" font-semibold">
              {" "}
              Created Date{" "}
            </Typography>
            <Typography variant="body2">{moment(state?.createdAt).format('MMM DD, YYYY')}</Typography>
          </Grid>
          <Grid item xs={3} className=" ">
            <Typography variant="button" className=" font-semibold">
              {" "}
              Due Date{" "}
            </Typography>
            <Typography variant="body2">{moment(state?.createdAt).format('MMM DD, YYYY')}</Typography>
          </Grid>
        </Grid>

        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle2" className=" font-semibold">
                    Payable Amount
                  </Typography>
                </TableCell>
                <TableCell align="right">{state?.payableAmt}</TableCell>
              </TableRow>

              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle2" className=" font-semibold">
                    Discount Amount
                  </Typography>
                </TableCell>
                <TableCell align="right">{state?.discAmt}</TableCell>
              </TableRow>

              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle2" className=" font-semibold">
                    Paid Amount
                  </Typography>
                </TableCell>
                <TableCell align="right">{state?.paidAmt}</TableCell>
              </TableRow>

              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle2" className=" font-semibold">
                    Due Amount
                  </Typography>
                </TableCell>
                <TableCell align="right">{state?.dueAmt}</TableCell>
              </TableRow>
              <Divider />

              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle2" className=" font-semibold">
                    Totle Amount
                  </Typography>
                </TableCell>
                <TableCell align="right">{state?.totalAmt}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box className=" mx-4">
          <Typography variant="button" className=" font-semibold">
            Note
          </Typography>
          <Divider  className=" my-2"/>
          {note}
        </Box>
      </Paper>
    </Box>
  );
}
