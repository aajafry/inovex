/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { fetcher } from "../../utility/fetcher";
import { orderSchema } from "../../utility/zodSchema/orderSchema";
import FormInput from "../commons/FormInput";
import FormSelect from "../commons/FormSelect";
import FormSubmitBtn from "../commons/FormSubmitBtn";
import InputDropzone from "../commons/InputDropzone";
import InputRichText from "../commons/InputRichText";
import { toast } from "react-toastify";

const statusOption = ["Ongoing", "Process", "Completed"];

const URL = `${process.env.ORDERS_ENDPOINT}/create`;
const userURL = process.env.USERS_ENDPOINT;
const serviceURL = process.env.SERVICES_ENDPOINT;

export default function OrderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(orderSchema),
  });

  const authToken = useSelector((state) => state?.authToken?.token);

  const { data: users } = useSWR([userURL, authToken], ([userURL, authToken]) =>
    fetcher(userURL, authToken)
  );
  const clientsData = users?.users?.filter((user) => user?.role === "Client");
  const employeeData = users?.users?.filter((user) => user?.role !== "Client");

  const { data: services } = useSWR(
    [serviceURL, authToken],
    ([serviceURL, authToken]) => fetcher(serviceURL, authToken)
  );

  // Use SWR to fetch data
  const { data: orderData, error, mutate } = useSWR([URL, authToken]);

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("client", data.client);
    formData.append("service", data.service);
    formData.append("manager", data.manager);
    formData.append("brif", data.brif);
    formData.append("attachment", data.attachment[0]);
    formData.append("openedAt", data.openedAt);
    formData.append("completedAt", data.completedAt);
    formData.append("quantity", data.quantity);
    formData.append("budget", data.budget);
    formData.append("status", data.status);

    try {
      const response = await axios.post(URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });
      // If successful, update the data with SWR
      mutate(response.data, false);
      toast.success("Order submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error.message);
      toast.error("Failed to submit order. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSelect
        label="Client Name"
        name="client"
        // type="text"
        register={register}
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
        label="Service Name"
        name="service"
        // type="text"
        register={register}
        // required
        hasTwoValue={true}
        ValuesOptions={services?.services}
      />
      {errors.service && (
        <Typography variant="subtitle2" sx={{ color: "error.main" }}>
          {errors.service.message}
        </Typography>
      )}

      <FormSelect
        label="Assigned To"
        name="manager"
        // type="text"
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

      <Typography variant="subtitle2" component="h5">
        Order Details
      </Typography>

      <Divider />

      <Typography variant="subtitle2" component="h6">
        Order Brif
      </Typography>

      <InputRichText InputWatch={watch} InputSetValue={setValue} />
      {errors.brif && (
        <Typography variant="subtitle2" sx={{ color: "error.main" }}>
          {errors.brif.message}
        </Typography>
      )}

      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Kick Off Date</Typography>
          <FormInput
            // label="Kick Off Date"
            name="openedAt"
            type="date"
            register={register}
            // required
          />
          {errors.openedAt && (
            <Typography variant="subtitle2" sx={{ color: "error.main" }}>
              {errors.openedAt.message}
            </Typography>
          )}
        </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle2">End Date</Typography>
          <FormInput
            // label="End Date"
            name="completedAt"
            type="date"
            register={register}
            // required
          />
          {errors.completedAt && (
            <Typography variant="subtitle2" sx={{ color: "error.main" }}>
              {errors.completedAt.message}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Typography variant="subtitle2">Upload Thumn! Image </Typography>
      <InputDropzone
        isName="attachment"
        isRegister={register}
        // isRequired={false}
        setDropzone={setValue}
      />
      {errors.attachment && (
        <Typography variant="subtitle2" sx={{ color: "error.main" }}>
          {errors.attachment.message}
        </Typography>
      )}

      <FormSelect
        label="Status"
        name="status"
        // type="text"
        register={register}
        // required
        ValuesOptions={statusOption}
      />
      {errors.status && (
        <Typography variant="subtitle2" sx={{ color: "error.main" }}>
          {errors.status.message}
        </Typography>
      )}

      <FormInput
        label="Quantity"
        name="quantity"
        type="text"
        register={register}
        // required
      />
      {errors.quantity && (
        <Typography variant="subtitle2" sx={{ color: "error.main" }}>
          {errors.quantity.message}
        </Typography>
      )}

      <FormInput
        label="Budget"
        name="budget"
        type="text"
        register={register}
        //  required
      />
      {errors.budget && (
        <Typography variant="subtitle2" sx={{ color: "error.main" }}>
          {errors.budget.message}
        </Typography>
      )}

      <FormSubmitBtn
        label={isSubmitting ? "Loading..." : "Create Order"}
        isdisabled={isSubmitting}
      />
    </form>
  );
}

const clientsName = ["Mark", "Biden", "Adam", "Smith"];
const servicesName = ["SEO", "Content Marketing", "Digital Marketing"];
const assignedEmployee = ["Jafry", "Diman", "Hridoy", "Rakib"];
