/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useSWR from 'swr';
import { fetcher } from "../../utility/fetcher";
import AddressInput from "../commons/AddressInput";
import FormInput from "../commons/FormInput";
import FormSelect from "../commons/FormSelect";
import FormSubmitBtn from "../commons/FormSubmitBtn";

const statusOptions = ["Paid", "Unpaid"];

const userURL = process.env.USERS_ENDPOINT;
const serviceURL = process.env.SERVICES_ENDPOINT;
const orderURL = process.env.ORDERS_ENDPOINT;


export default function InvoiceForm() {
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [payableAmt, setPayableAmt] = useState(0);

  const { register, handleSubmit, control, formState: { errors }, watch, setValue } = useForm();
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
      const response = await axios.post(`${process.env.INVOICES_ENDPOINT}/create`, data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken.access_token}`,
        },
      });
      // If successful, update the data with SWR
      mutate(response?.data, false);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
    console.log(data)
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
        ValuesOptions={servicesData?.services}
      />
      {errors.service && <p className="error">This field is required</p>}

      <FormControl fullWidth>
        <InputLabel id="orderId">Order ID</InputLabel>
        <Select
          label="Order ID"
          labelId="orderId"
          id="orderId"
          sx={{ mb: 2, p: 0, width: "100%" }}
          {...register("orderId", { required: true })}
          value={selectedOrderId}
          onChange={(e) => setSelectedOrderId(e.target.value)}
        >
          {ordersId?.map((value, index) => (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {errors.orderId && <p className="error">This field is required</p>}

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
          {errors[field] && <p className="error">{`Error for ${field}: ${errors[field].message}`}</p>}
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
        ValuesOptions={statusOptions}
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
