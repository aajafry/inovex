/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Box, TextField, Typography } from "@mui/material";
import axios from 'axios';
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useSWR from 'swr';
import { fetcher } from "../../utility/fetcher";
import AddressInput from "../commons/AddressInput";
import FormInput from "../commons/FormInput";
import FormSelect from "../commons/FormSelect";
import FormSubmitBtn from "../commons/FormSubmitBtn";

// Constants
const statusOption = ["Paid", "unpaid"];

const URL = `${process.env.INVOICES_ENDPOINT}/create`;
const userURL = process.env.USERS_ENDPOINT;
const serviceURL = process.env.SERVICES_ENDPOINT;
const orderURL = process.env.ORDERS_ENDPOINT;


export default function InvoiceForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();

  
  const authToken = useSelector((state) => state.authToken.token);

  const { data: users } = useSWR([userURL, authToken], ([userURL, authToken]) => fetcher(userURL, authToken.access_token))
  const clientsData = users?.users?.filter((user) => user?.role === "Client");
  
  const { data: services } = useSWR([serviceURL, authToken], ([serviceURL, authToken]) => fetcher(serviceURL, authToken.access_token))

  const { data: orders } = useSWR([orderURL, authToken], ([orderURL, authToken]) => fetcher(orderURL, authToken.access_token))
  const ordersId = orders?.orders?.map(order => order?._id);

  // Use SWR to fetch data
  const { data: formData, error, mutate } = useSWR([URL, authToken]); 

  const onSubmit = async (data) => {
    // Handle form submission logic here
    const calculateDueAmount = () => {
      const payableAmt = Number(watch("payableAmt"));
      const discAmt = Number(watch("discAmt"));
      const paidAmt = Number(watch("paidAmt"));
      return parseFloat((payableAmt - (discAmt + paidAmt)).toFixed(3));
    };
    const calculateTotalAmount = () => {
      const payableAmt = Number(watch("payableAmt"));
      return parseFloat((payableAmt - calculateDueAmount()).toFixed(3));
    };
    data.dueAmt = calculateDueAmount();
    data.totalAmt = calculateTotalAmount();

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
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Client Section */}
      <FormSelect
        label="Client Name"
        name="client"
        register={register}
        required
        hasTwoValue={true}
        ValuesOptions={clientsData}
      />
      {errors.client && <p className="error">This field is required</p>}

      {/* Billing Address Section */}
      <Typography variant="subtitle2" component="h6" sx={{ mb: 2 }}>
        Billing Address
      </Typography>
      <AddressInput register={register} errors={errors} />

      {/* Service and Order Section */}
      <FormSelect
        label="Service Name"
        name="service"
        register={register}
        required
        hasTwoValue={true}
        ValuesOptions={services?.services}
      />
      {errors.service && <p className="error">This field is required</p>}

      <FormSelect
        label="Order ID"
        name="orderId"
        register={register}
        required
        ValuesOptions={ordersId}
      />
      {errors.orderId && <p className="error">This field is required</p>}

      {/* Payment Details Section */}
      <Typography variant="subtitle2" component="h6" sx={{ mb: 2 }}>
        Payment Details
      </Typography>

      {/* payable, discount and paid Amount Section */}
      {["payableAmt", "discAmt", "paidAmt"].map((field) => (
        <Box key={field}>
          <Controller
            // key={field}
            name={field}
            control={control}
            defaultValue={field === "payableAmt" ? 100 : 0}
            render={({ field }) => {
              const { name, value, onChange } = field;
              return (
                <TextField
                  // key={name}
                  label={
                    name === "payableAmt"
                      ? "Payable Amount"
                      : name === "discAmt"
                      ? "Discount Amount"
                      : "Paid Amount"
                  }
                  name={name}
                  type="number"
                  value={value}
                  onChange={(event) => onChange(event.target.value)}
                  disabled={name === "payableAmt"}
                  required={!["discAmt"].includes(name)}
                  sx={{ mb: 2, pb: 0, width: "100%" }}
                />
              );
            }}
          />
          {errors[field] && (
            <p className="error">{`Error for ${field}: ${errors[field].message}`}</p>
          )}
        </Box>
      ))}

      {/* Due and Total Amount Section */}
      {["dueAmt", "totalAmt"].map((field) => (
        <Box key={field}>
          <Controller
            // key={field}
            name={field}
            control={control}
            defaultValue={0}
            render={({ field }) => {
              const { name } = field;
              return (
                <TextField
                  // key={name}
                  label={name === "dueAmt" ? "Due Amount" : "Total Amount"}
                  name={name}
                  type="number"
                  value={
                    name === "dueAmt"
                      ? Number(watch("payableAmt")) -
                        (Number(watch("discAmt")) + Number(watch("paidAmt")))
                      : Number(watch("payableAmt")) -
                        (Number(watch("payableAmt")) -
                          (Number(watch("discAmt")) + Number(watch("paidAmt"))))
                  }
                  disabled
                  sx={{ mb: 2, pb: 0, width: "100%" }}
                />
              );
            }}
          />
          {errors[field] && (
            <p className="error">{`Error for ${field}: ${errors[field].message}`}</p>
          )}
        </Box>
      ))}

      {/* payment status section */}
      <FormSelect
        label="Status"
        name="status"
        register={register}
        required
        ValuesOptions={statusOption}
      />
      {errors.status && <p className="error">This field is required</p>}

      {/* Note Section */}
      <FormInput label="Note" name="note" register={register} multiline />
      {errors.note && <p className="error">This field is required</p>}

      {/* Submit Button */}
      <FormSubmitBtn />
    </form>
  );
}

