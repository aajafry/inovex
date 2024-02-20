/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography } from "@mui/material";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Navigate } from 'react-router-dom';
import useSWR from 'swr';
import FormInput from "../components/commons/FormInput";
import FormSubmitBtn from "../components/commons/FormSubmitBtn";
import { setAuthToken } from "../features/token/tokenSlice";
import { loginSchema } from '../utility/zodSchema/loginSchema';

const URL = process.env.LOGIN_ENDPOINT;

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({ 
    // resolver: zodResolver(loginSchema)
  });

  // Use SWR to fetch data
  const { data: token, error, isLoading, mutate } = useSWR([URL]); 

  const dispatch = useDispatch();
  // dispatch(setAuthToken(token));

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(URL, data);
      // If successful, update the data with SWR
      mutate(response?.data, false);
      dispatch(setAuthToken(response?.data));
    }
     catch (error) {
      console.error("Error submitting form:", error?.message);
    }
  };

  return (
    <Box className="flex justify-center items-center h-full">
      <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" align="center" className="uppercase" sx={{ color: "secondary.main"}}>inovex</Typography>
        <FormInput 
          label="User Email" 
          type="email" 
          name="email" 
          register={register} 
          // required 
        />
        {errors?.email && <Typography variant="subtitle2" sx={{color: 'error.main'}}>{errors.email.message}</Typography>}

        <FormInput 
          label="Password" 
          name="password" 
          type="password" 
          register={register} 
          // required 
        />
        {errors?.password && <Typography variant="subtitle2" sx={{color: 'error.main'}}>{errors.password.message}</Typography>}

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
