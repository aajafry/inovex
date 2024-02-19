/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField, Typography } from "@mui/material";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useSWR from 'swr';
import { fetcher } from "../../utility/fetcher";
import { invoiceSchema } from "../../utility/zodSchema/invoiceSchema";
import AddressInput from "../commons/AddressInput";
import FormInput from "../commons/FormInput";
import FormSelect from "../commons/FormSelect";
import FormSubmitBtn from "../commons/FormSubmitBtn";

const statusOptions = ["Paid", "Unpaid"];

const userURL = process.env.USERS_ENDPOINT;
const serviceURL = process.env.SERVICES_ENDPOINT;
const orderURL = process.env.ORDERS_ENDPOINT;
const URL = process.env.INVOICES_ENDPOINT;


export default function InvoiceForm() {
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [payableAmt, setPayableAmt] = useState(0);

  const { register, handleSubmit, control, formState: { errors }, watch, setValue } = useForm({ 
    resolver: zodResolver(invoiceSchema)
   });
  const authToken = useSelector((state) => state.authToken.token);

  const { data: usersData } = useSWR([userURL, authToken], ([userURL, authToken]) => fetcher(userURL, authToken?.access_token))
  const clientsData = usersData?.users?.filter((user) => user?.role === "Client");

  const { data: servicesData } = useSWR([serviceURL, authToken], ([serviceURL, authToken]) => fetcher(serviceURL, authToken?.access_token))

  const { data: ordersData } = useSWR([orderURL, authToken], ([orderURL, authToken]) => fetcher(orderURL, authToken.access_token))
  const ordersId = ordersData?.orders?.map(order => order?._id);
  
  useEffect(() => {
    if (selectedOrderId) {
      const selectedOrder = ordersData?.orders?.find(order => order?._id === selectedOrderId);
      if (selectedOrder) {
        setPayableAmt(selectedOrder?.budget);
        setValue("payableAmt", selectedOrder?.budget);
      }
    } else {
      setPayableAmt(0);
      setValue("payableAmt", 0);
    }
  }, [selectedOrderId, ordersData, setValue]);

  // Use SWR to fetch data
  const { data: invoiceData, error, mutate } = useSWR([URL, authToken]); 

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
      const response = await axios.post(`${URL}/create`, data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken.access_token}`,
        },
      });
      // If successful, update the data with SWR
      mutate(response?.data, false);
      setIsFormSubmited(true);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Client Section */}
      <FormSelect
        label="Client Name"
        // type="text"
        name="client"
        register={register}
        // required
        hasTwoValue={true}
        ValuesOptions={clientsData}
      />
      {errors.client && <Typography variant="subtitle2" sx={{color: 'error.main'}}>{errors.client.message}</Typography>}

      {/* Billing Address Section */}
      <Typography variant="subtitle2" component="h6" sx={{ mb: 2 }}>
        Billing Address
      </Typography>
      <AddressInput register={register} errors={errors} />

      {/* Service and Order Section */}
      <FormSelect
        label="Service Name"
        // type="text"
        name="service"
        register={register}
        // required
        hasTwoValue={true}
        ValuesOptions={servicesData?.services}
      />
      {errors.service && <Typography variant="subtitle2" sx={{color: 'error.main'}}>{errors.service.message}</Typography>}

      <FormSelect
        label="Order ID"
        // type="text"
        name="order"
        register={register}
        // required
        ValuesOptions={ordersId}
        setSelectedOrderId={setSelectedOrderId}

      />
      {errors.order && <Typography variant="subtitle2" sx={{color: 'error.main'}}>{errors.order.message}</Typography>}

      {/* Payment Details Section */}
      <Typography variant="subtitle2" component="h6" sx={{ mb: 2 }}>
        Payment Details
      </Typography>

      {/* payable, discount and paid Amount Section */}
      {["payableAmt", "discAmt", "paidAmt"].map((field) => (
        <Box key={field}>
          <Controller
            name={field}
            control={control}
            defaultValue={0}
            render={({ field }) => {
              const {name, value, onChange} = field;
              return(
                <TextField
                  label={name === "payableAmt" ? "Payable Amount" : name === "discAmt" ? "Discount Amount" : "Paid Amount"}
                  name={name}
                  type="number"
                  value={value}
                  onChange={onChange}
                  disabled={name === "payableAmt"}
                  required={!["discAmt"].includes(name)}
                  sx={{ mb: 2, pb: 0, width: "100%" }}
                />
              );
            }}
          />
          {errors[field] && <Typography variant="subtitle2" sx={{color: 'error.main'}}>{`Error for ${field}: ${errors[field].message}`}</Typography>}
        </Box>
      ))}

      {/* Due and Total Amount Section */}
      {["dueAmt", "totalAmt"].map((field) => (
        <Box key={field}>
          <Controller
            name={field}
            control={control}
            defaultValue={0}
            render={({ field }) => {
              const { name } = field;
              return(
                <TextField
                  // key={field}
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
             <Typography variant="subtitle2" sx={{color: 'error.main'}}>{`Error for ${field}: ${errors[field].message}`}</Typography>
          )}          
        </Box>
      ))}

      {/* payment status section */}
      <FormSelect
        label="Status"
        // type="text"
        name="status"
        register={register}
        // required
        ValuesOptions={statusOptions}
      />
      {errors.status && <Typography variant="subtitle2" sx={{color: 'error.main'}}>{errors.status.message}</Typography>}

      {/* Note Section */}
      <FormInput 
        label="Note" 
        type="text"
        name="note" 
        register={register} 
        multiline 
      />
      {errors.note && <Typography variant="subtitle2" sx={{color: 'error.main'}}>{errors.note.message}</Typography>}

      {/* Submit Button */}
      <FormSubmitBtn isdisabled={isFormSubmited} />
    </form>
  );
}
