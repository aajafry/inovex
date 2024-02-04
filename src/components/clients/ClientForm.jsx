/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { Typography } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useSWR from 'swr';
import AddressInput from "../commons/AddressInput";
import FormInput from "../commons/FormInput";
import FormSubmitBtn from "../commons/FormSubmitBtn";

const URL = `${process.env.USERS_ENDPOINT}/create`;

export default function ClientForm() {
  const {
    register,
    handleSubmit,
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
        label="Client Name"
        name="name"
        register={register}
        required
      />
      {errors.name && <p>This field is required</p>}

      <FormInput
        label="Client Email"
        name="email"
        register={register}
        required
      />
      {errors.email && <p>This field is required</p>}

      <FormInput
        label="Password"
        name="password"
        register={register}
        required
      />
      {errors.password && <p>This field is required</p>}

      <Typography variant="subtitle2" component="h6">
        Address
      </Typography>
      <AddressInput register={register} errors={errors} />

      <FormInput
        label="Default Role Client"
        name="role"
        register={register}
        required
      />
      {errors.role && <p>This field is required</p>}
      
      <FormSubmitBtn />
    </form>
  );
}
