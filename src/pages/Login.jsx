/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Navigate } from 'react-router-dom';
import useSWR from 'swr';
import FormInput from "../components/commons/FormInput";
import FormSubmitBtn from "../components/commons/FormSubmitBtn";
import { setAuthToken } from "../features/token/tokenSlice";

const URL = process.env.LOGIN_ENDPOINT;

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Use SWR to fetch data
  const { data: token, error, isLoading, mutate } = useSWR([URL]); 

  const dispatch = useDispatch();
  dispatch(setAuthToken(token));

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(URL, data);
      // If successful, update the data with SWR
      mutate(response?.data, false);
    }
     catch (error) {
      console.error("Error submitting form:", error?.message);
    }
  };

  return (
    <Box className="flex justify-center items-center h-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="User Email" name="email" register={register} required />
        {errors?.email && <p>This field is required</p>}

        <FormInput label="Password" name="password" type="password" register={register} required />
        {errors?.password && <p>This field is required</p>}

        <FormSubmitBtn label="login" />

        {/* Display loading state */}
        {isLoading && <p>Loading...</p>}
        {/* Display error state */}
        {error && <p>Error: {error?.message}</p>}
        {/* Navigate dashboard */}
        {token &&  <Navigate to='/' replace />}
      </form>
    </Box>
  );
}
