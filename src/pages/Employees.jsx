/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Paper } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from 'swr';
import HeadingTitle from "../components/commons/HeadingTitle";
import ModalCTAbtn from "../components/commons/ModalCTAbtn";
import EmployeeModal from "../components/teams/EmployeeModal";
import EmployeeTable from "../components/teams/EmployeeTable";
import { fetcher } from "../utility/fetcher";

const URL = process.env.USERS_ENDPOINT;


export default function Employees() {
  const [modalOpen, setModalOpen] = useState(false);

  const authToken = useSelector((state) => state?.authToken?.token);

  const { data: employees, error, isLoading } = useSWR([URL, authToken], ([URL, authToken]) => fetcher(URL, authToken?.access_token))
  const employeesData = employees?.users?.filter((user) => user?.role !== "Client");

  return (
    <>
      <Paper elevation={2} className="w-full flex justify-between items-center">
        <HeadingTitle HeadingLabel="Employees" />
        <ModalCTAbtn
          BtnLabel="Create Employee"
          OnModal={() => setModalOpen(true)}
        />
      </Paper>

      <EmployeeModal OpenModal={modalOpen} OffModal={() => setModalOpen(false)} />

      
      {isLoading && <h2>Loading...</h2>}
      {employeesData && <EmployeeTable employees={employeesData} />}
      
    </>
  );
}
