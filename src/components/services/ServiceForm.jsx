/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Typography } from "@mui/material";
import axios from "axios";
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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const authToken = useSelector((state) => state.authToken.token);

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
      <FormInput
        label="Service Name"
        name="name"
        register={register}
        required
      />
      {errors.name && <p>This field is required</p>}

      <Typography variant="subtitle2" component="h6">
        Description
      </Typography>

      <InputRichText InputWatch={watch} InputSetValue={setValue} />
      {errors.brif && <p>This field is required</p>}

      <InputDropzone
        isName="attachment"
        isRegister={register}
        isRequired={false}
        SetDropzone={setValue}
      />
      {errors.attachment && <p>This field is required</p>}

      <FormSelect
        label="Pricing"
        name="paymentTerm"
        register={register}
        required
        ValuesOptions={PricingOption}
      />
      {errors.paymentTerm && <p>This field is required</p>}

      <FormInput
        label="USD"
        name="price"
        type="number"
        register={register}
        required
      />
      {errors.price && <p>This field is required</p>}

      <FormInput
        label="Duration"
        name="duration"
        register={register}
        required
      />
      {errors.duration && <p>This field is required</p>}

      <FormSubmitBtn />
    </form>
  );
}