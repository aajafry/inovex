/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Divider, Grid, Typography } from "@mui/material";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useSWR from 'swr';
import { fetcher } from "../../utility/fetcher";
import FormInput from "../commons/FormInput";
import FormSelect from "../commons/FormSelect";
import FormSubmitBtn from "../commons/FormSubmitBtn";
import InputDropzone from "../commons/InputDropzone";
import InputRichText from "../commons/InputRichText";

const statusOption = ["Ongoing","Process","Completed"];

const URL = `${process.env.ORDERS_ENDPOINT}/create`;
const userURL = process.env.USERS_ENDPOINT;
const serviceURL = process.env.SERVICES_ENDPOINT;

export default function OrderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const authToken = useSelector((state) => state.authToken.token);

  const { data: users } = useSWR([userURL, authToken], ([userURL, authToken]) => fetcher(userURL, authToken.access_token))
  const clientsData = users?.users?.filter((user) => user?.role === "Client");
  const employeeData = users?.users?.filter((user) => user?.role !== "Client");
  
  const clientsId = clientsData?.map(client => client._id);
  const clientsName = clientsData?.map(client => client.name);
  
  const employeesId = employeeData?.map(employee => employee._id);
  const employeesName = employeeData?.map(employee => employee.name);

  const { data: services } = useSWR([serviceURL, authToken], ([serviceURL, authToken]) => fetcher(serviceURL, authToken.access_token))
   
  const servicesId = services?.services?.map(service => service._id);
  const servicesname = services?.services?.map(service => service.name);

  // Use SWR to fetch data
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
        ValuesOptions={clientsId}
      />
      {errors.Client && <p>This field is required</p>}

      <FormSelect
        label="Service Name"
        name="service"
        register={register}
        required
        ValuesOptions={servicesId}
      />
      {errors.service && <p>This field is required</p>}

      <FormSelect
        label="Assigned To"
        name="manager"
        register={register}
        required
        ValuesOptions={employeesId}
      />
      {errors.manager && <p>This field is required</p>}

      <Typography variant="subtitle2" component="h5">
        Order Details
      </Typography>

      <Divider />

      <Typography variant="subtitle2" component="h6">
        Order Brif
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
        SetDropzone={setValue}
      />

      {errors.attachment && <p>This field is required</p>}

      <FormSelect
        label="Status"
        name="status"
        register={register}
        required
        ValuesOptions={statusOption}
      />
      {errors.status && <p>This field is required</p>}

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

const clientsName = ["Mark", "Biden", "Adam", "Smith"];
const servicesName = ["SEO", "Content Marketing", "Digital Marketing"];
const assignedEmployee = ["Jafry", "Diman", "Hridoy", "Rakib"];
