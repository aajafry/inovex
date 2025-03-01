/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { fetcher } from "../../utility/fetcher";
import { ticketSchema } from "../../utility/zodSchema/ticketSchema";
import FormInput from "../commons/FormInput";
import FormSelect from "../commons/FormSelect";
import FormSubmitBtn from "../commons/FormSubmitBtn";
import InputRichText from "../commons/InputRichText";
import { toast } from "react-toastify";

const statusOption = ["Open", "Hold", "Close"];
const priorityOption = ["Urgent", "Regular", "Normal"];

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
  } = useForm({
    resolver: zodResolver(ticketSchema),
  });

  const authToken = useSelector((state) => state.authToken.token);

  const { data: users } = useSWR([userURL, authToken], ([userURL, authToken]) =>
    fetcher(userURL, authToken)
  );
  const clientsData = users?.users?.filter((user) => user?.role === "Client");
  const employeeData = users?.users?.filter((user) => user?.role !== "Client");

  const { data: orders } = useSWR(
    [orderURL, authToken],
    ([orderURL, authToken]) => fetcher(orderURL, authToken)
  );
  const ordersId = orders?.orders?.map((order) => order._id);

  const { data: formData, error, mutate } = useSWR([URL, authToken]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(URL, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      // If successful, update the data with SWR
      mutate(response.data, false);
      setIsFormSubmited(true);
      toast.success("Ticket created successfully");
    } catch (error) {
      console.error("Error submitting form:", error.message);
      toast.error("Failed to submit ticket. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSelect
        label="Client Name"
        // type="text"
        register={register}
        name="client"
        // required
        hasTwoValue={true}
        ValuesOptions={clientsData}
      />
      {errors.client && (
        <Typography variant="subtitle2" sx={{ color: "error.main" }}>
          {errors.client.message}
        </Typography>
      )}

      <FormSelect
        label="Order ID"
        // type="text"
        name="order"
        register={register}
        // required
        ValuesOptions={ordersId}
      />
      {errors.order && (
        <Typography variant="subtitle2" sx={{ color: "error.main" }}>
          {errors.order.message}
        </Typography>
      )}

      <FormInput
        label="Subject"
        type="text"
        name="subject"
        register={register}
        // required
      />
      {errors.subject && (
        <Typography variant="subtitle2" sx={{ color: "error.main" }}>
          {errors.subject.message}
        </Typography>
      )}

      <FormSelect
        label="Assigned To"
        // type="text"
        name="manager"
        register={register}
        // required
        hasTwoValue={true}
        ValuesOptions={employeeData}
      />
      {errors.manager && (
        <Typography variant="subtitle2" sx={{ color: "error.main" }}>
          {errors.manager.message}
        </Typography>
      )}

      <Typography variant="subtitle2" component="h6">
        Description
      </Typography>

      <InputRichText InputWatch={watch} InputSetValue={setValue} />
      {errors.brif && (
        <Typography variant="subtitle2" sx={{ color: "error.main" }}>
          {errors.brif.message}
        </Typography>
      )}

      <FormSelect
        label="Status"
        // type="text"
        name="status"
        register={register}
        // required
        ValuesOptions={statusOption}
      />
      {errors.status && (
        <Typography variant="subtitle2" sx={{ color: "error.main" }}>
          {errors.status.message}
        </Typography>
      )}

      <FormSelect
        label="Priority"
        // type="text"
        name="priority"
        register={register}
        // required
        ValuesOptions={priorityOption}
      />
      {errors.priority && (
        <Typography variant="subtitle2" sx={{ color: "error.main" }}>
          {errors.priority.message}
        </Typography>
      )}

      <FormSubmitBtn isdisabled={isFormSubmited} />
    </form>
  );
}
