/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Divider, Grid, Typography } from "@mui/material";
import axios from 'axios';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useSWR from 'swr';
import { fetcher } from "../../utility/fetcher";
import FormInput from "../commons/FormInput";
import FormSelect from "../commons/FormSelect";
import FormSubmitBtn from "../commons/FormSubmitBtn";
import InputDropzone from "../commons/InputDropzone";
import InputRichText from "../commons/InputRichText";


const URL = `${process.env.QUOTATIONS_ENDPOINT}/create`;
const userURL = process.env.USERS_ENDPOINT;
const serviceURL = process.env.SERVICES_ENDPOINT;


export default function QuotationForm() {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const authToken = useSelector((state) => state?.authToken?.token);

  const { data: users } = useSWR([userURL, authToken], ([userURL, authToken]) => fetcher(userURL, authToken.access_token))
  const clientsData = users?.users?.filter((user) => user?.role === "Client");
  const employeeData = users?.users?.filter((user) => user?.role !== "Client");

  const { data: services } = useSWR([serviceURL, authToken], ([serviceURL, authToken]) => fetcher(serviceURL, authToken.access_token))
   
  const { data: quotationData, error, mutate } = useSWR([URL, authToken]); 

  const onSubmit = async (data) => {
    
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

  console.log("data",data);

    try {
      const response = await axios.post(URL, formData, {
        headers: {
          // "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken?.access_token}`,
        },
      });
      // If successful, update the data with SWR
      mutate(response.data, false);
      setIsFileUploaded("response", response);
      console.log('response', response);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };
  
  console.log("quotationData", quotationData);

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
      {errors.client && <p>This field is required</p>}

      <FormSelect
        label="Service Name"
        name="service"
        register={register}
        required
        hasTwoValue={true}
        ValuesOptions={services?.services}
      />
      {errors.service && <p>This field is required</p>}

      <FormSelect
        label="Assigned To"
        name="manager"
        register={register}
        required
        hasTwoValue={true}
        ValuesOptions={employeeData}
      />
      {errors.manager && <p>This field is required</p>}

      <Typography variant="subtitle2" component="h5">
        Quotation Details
      </Typography>

      <Divider />

      <Typography variant="subtitle2" component="h6">
        Quotation Brif
      </Typography>

      <InputRichText InputWatch={watch} InputSetValue={setValue} />
      {errors.brif && <p>This field is required</p>}

      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item xs={6}>
          <FormInput
            label="Kick Off Date"
            name="openedAt"
            type="date"
            register={register}
            required
          />
          {errors.openedAt && <p>This field is required</p>}
        </Grid>

        <Grid item xs={6}>
          <FormInput
            label="End Date"
            name="completedAt"
            type="date"
            register={register}
            required
          />
          {errors.completedAt && <p>This field is required</p>}
        </Grid>
      </Grid>

      <InputDropzone
        isName="attachment"
        isRegister={register}
        isRequired={false}
        setDropzone={setValue}
      />
      {errors.attachment && <p>This field is required</p>}

      <FormInput
        label="Quantity"
        name="quantity"
        register={register}
        required
      />
      {errors.quantity && <p>This field is required</p>}

      <FormInput label="Budget" name="budget" register={register} required />
      {errors.budget && <p>This field is required</p>}

      <FormSubmitBtn />
    </form>
  );
}
