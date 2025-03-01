/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography, Container } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import useSWR from "swr";
import FormInput from "../components/commons/FormInput";
import FormSubmitBtn from "../components/commons/FormSubmitBtn";
import { signupSchema } from "../utility/zodSchema/signupSchema";
import { toast } from "react-toastify";

const URL = `${process.env.AUTH_ENDPOINT}/signup`;

export default function Signup() {
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const { data: newUser, error, isLoading, mutate } = useSWR([URL]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(URL, data);
      // If successful, update the data with SWR
      mutate(response.data, false);
      setIsFormSubmited(true);
      toast.success("Signup successful! Please login.");
    } catch (error) {
      console.error("Error submitting form:", error.message);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box className="flex flex-col items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full p-6 bg-white shadow-md hover:shadow-lg rounded-lg"
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ color: "secondary.main", fontWeight: "bold", mb: 3 }}
          >
            Register with Inovex
          </Typography>

          <FormInput label="Name" type="text" name="name" register={register} />
          {errors.name && (
            <Typography color="error">{errors.name.message}</Typography>
          )}

          <FormInput
            label="Email"
            type="email"
            name="email"
            register={register}
          />
          {errors.email && (
            <Typography color="error">{errors.email.message}</Typography>
          )}

          <FormInput
            label="Password"
            type="password"
            name="password"
            register={register}
          />
          {errors.password && (
            <Typography color="error">{errors.password.message}</Typography>
          )}

          <Typography variant="subtitle2" className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </Typography>

          <FormSubmitBtn label="Signup" isdisabled={isFormSubmited} />

          {isLoading && <Typography variant="subtitle2">Loading...</Typography>}
          {error && (
            <Typography variant="subtitle2" color="error">
              Error: {error.message}
            </Typography>
          )}
          {newUser && <Navigate to="/login" replace />}
        </form>
      </Box>
    </Container>
  );
}
