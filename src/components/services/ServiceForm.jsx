/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useSWR from 'swr';
import FormInput from "../commons/FormInput";
import FormSelect from "../commons/FormSelect";
import FormSubmitBtn from "../commons/FormSubmitBtn";
import InputDropzone from "../commons/InputDropzone";
import InputRichText from "../commons/InputRichText";

const PricingOption = ["Pay with Invoice","Pay with Instalment"];

const URL = `${process.env.SERVICES_ENDPOINT}/create`;

export default function ServiceForm() {
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const authToken = useSelector((state) => state?.authToken?.token);

  const { data: serviceData, error, mutate } = useSWR([URL, authToken]); 

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("brif", data.brif);
    formData.append("attachment", data.attachment[0]);
    formData.append("paymentTerm", data.paymentTerm);
    formData.append("price", data.price);
    formData.append("duration", data.duration);

    try {
      const response = await axios.post(URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${authToken?.access_token}`,
        },
      });
      // If successful, update the data with SWR
      mutate(response.data, false);
      setIsFormSubmited(true);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="Service Name"
        name="name"
        register={register}
        required
      />
      {errors.name && <Typography variant="subtitle2" sx={{color: 'error.main'}}>This field is required</Typography>}

      <Typography variant="subtitle2" component="h6">
        Description
      </Typography>

      <InputRichText InputWatch={watch} InputSetValue={setValue} />
      {errors.brif && <Typography variant="subtitle2" sx={{color: 'error.main'}}>This field is required</Typography>}

      <Typography variant="subtitle2">Upload Thumn! Image </Typography>
      <InputDropzone
        isName="attachment"
        isRegister={register}
        isRequired={false}
        setDropzone={setValue}
      />
      {errors.attachment && <Typography variant="subtitle2" sx={{color: 'error.main'}}>This field is required</Typography>}

      <FormSelect
        label="Pricing"
        name="paymentTerm"
        register={register}
        required
        ValuesOptions={PricingOption}
      />
      {errors.paymentTerm && <Typography variant="subtitle2" sx={{color: 'error.main'}}>This field is required</Typography>}

      <FormInput
        label="USD"
        name="price"
        type="number"
        register={register}
        required
      />
      {errors.price && <Typography variant="subtitle2" sx={{color: 'error.main'}}>This field is required</Typography>}

      <FormInput
        label="Duration"
        name="duration"
        register={register}
        required
      />
      {errors.duration && <Typography variant="subtitle2" sx={{color: 'error.main'}}>This field is required</Typography>}

      <FormSubmitBtn isdisabled={isFormSubmited} />
    </form>
  );
}