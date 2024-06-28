/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import useSWR from 'swr';
import FormInput from "../components/commons/FormInput";
import FormSubmitBtn from "../components/commons/FormSubmitBtn";
import { signupSchema } from "../utility/zodSchema/signupSchema";
import { toast } from 'react-toastify';

const URL = `${process.env.AUTH_ENDPOINT}/signup`;

export default function Signup() {
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ 
    resolver: zodResolver(signupSchema)
  });

  const { data: newUser, error, isLoading, mutate } = useSWR([URL]); 

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(URL, data);
      // If successful, update the data with SWR
      mutate(response.data, false);
      setIsFormSubmited(true);
      toast.success('Signup successful! Please login.');
    } catch (error) {
      console.error("Error submitting form:", error.message);
      toast.error('Signup failed. Please try again.');
    }
  };

  return (
    <Box className="flex justify-center items-center h-full">
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" align="center" className="uppercase font-semibold" sx={{ color: "secondary.main"}}>register with inovex</Typography>
       <FormInput
        label="Name"
        type="text"
        name="name"
        register={register}
      />
      {errors.name && <Typography variant="subtitle2" sx={{color: 'error.main'}}>{errors.name.message}</Typography>}

      <FormInput
        label="Email"
        type="email"
        name="email"
        register={register}
      />
      {errors.email && <Typography variant="subtitle2" sx={{color: 'error.main'}}>{errors.email.message}</Typography>}

      <FormInput
        label="Password"
        type="password"
        name="password"
        register={register}
      />
      {errors.password && <Typography variant="subtitle2" sx={{color: 'error.main'}}>{errors.password.message}</Typography>} 


      <Typography variant="subtitle2">
        Already have an account? <Link to="/login" className="text-blue-600 font-semibold">login</Link>
      </Typography>

      <FormSubmitBtn label="signup" isdisabled={isFormSubmited} />

      {/* Display loading state */}
        {isLoading && <p>Loading...</p>}
        {/* Display error state */}
        {error && <p>Error: {error?.message}</p>}
        {/* Navigate dashboard */}
        {newUser &&  <Navigate to='/login' replace />}
    </form>
    </Box>
  );
}
