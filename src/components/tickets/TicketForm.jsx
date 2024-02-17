/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Typography } from "@mui/material";
import axios from 'axios';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useSWR from 'swr';
import { fetcher } from "../../utility/fetcher";
import FormInput from "../commons/FormInput";
import FormSelect from "../commons/FormSelect";
import FormSubmitBtn from "../commons/FormSubmitBtn";
import InputRichText from "../commons/InputRichText";

const statusOption = ["Open","Hold","Close"];
const priorityOption = ["Urgent","Regular","Normal"];

const URL = `${process.env.TICKETS_ENDPOINT}/create`;
const userURL = process.env.USERS_ENDPOINT;
const orderURL = process.env.ORDERS_ENDPOINT;

export default function TicketForm() {
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const authToken = useSelector((state) => state.authToken.token);

  const { data: users } = useSWR([userURL, authToken], ([userURL, authToken]) => fetcher(userURL, authToken.access_token))
  const clientsData = users?.users?.filter((user) => user?.role === "Client");
  const employeeData = users?.users?.filter((user) => user?.role !== "Client");
  
  const { data: orders } = useSWR([orderURL, authToken], ([orderURL, authToken]) => fetcher(orderURL, authToken.access_token))
  const ordersId = orders?.orders?.map(order => order._id);

  const { data: formData, error, mutate } = useSWR([URL, authToken]); 

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(URL, data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken.access_token}`,
        },
      });
      // If successful, update the data with SWR
      mutate(response.data, false);
      setIsFormSubmited(true);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };
  console.log(formData?.message);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSelect
        label="Client Name"
        name="client"
        register={register}
        required
        hasTwoValue={true}
        ValuesOptions={clientsData}
      />
      {errors.client && <Typography variant="subtitle2" sx={{color: 'error.main'}}>This field is required</Typography>}

      <FormSelect
        label="Order ID"
        name="order"
        register={register}
        required
        ValuesOptions={ordersId}
      />
      {errors.order && <Typography variant="subtitle2" sx={{color: 'error.main'}}>This field is required</Typography>}

      <FormInput label="Subject" name="subject" register={register} required />
      {errors.subject && <Typography variant="subtitle2" sx={{color: 'error.main'}}>This field is required</Typography>}

      <FormSelect
        label="Assigned To"
        name="manager"
        register={register}
        required
        hasTwoValue={true}
        ValuesOptions={employeeData}
      />
      {errors.manager && <Typography variant="subtitle2" sx={{color: 'error.main'}}>This field is required</Typography>}

      <Typography variant="subtitle2" component="h6">
        Description
      </Typography>

      <InputRichText InputWatch={watch} InputSetValue={setValue} />
      {errors.brif && <Typography variant="subtitle2" sx={{color: 'error.main'}}>This field is required</Typography>}

      <FormSelect
        label="Status"
        name="status"
        register={register}
        required
        ValuesOptions={statusOption}
      />
      {errors.status && <Typography variant="subtitle2" sx={{color: 'error.main'}}>This field is required</Typography>}

      <FormSelect
        label="Priority"
        name="priority"
        register={register}
        required
        ValuesOptions={priorityOption}
      />
      {errors.priority && <Typography variant="subtitle2" sx={{color: 'error.main'}}>This field is required</Typography>}

      <FormSubmitBtn isdisabled={isFormSubmited} />
    </form>
  );
}
