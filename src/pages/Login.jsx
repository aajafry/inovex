/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "../components/commons/FormInput";
import FormSubmitBtn from "../components/commons/FormSubmitBtn";
import { setAuthToken } from "../features/token/tokenSlice";
import { loginSchema } from "../utility/zodSchema/loginSchema";

const URL = `${process.env.AUTH_ENDPOINT}/login`;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(URL, data);
      dispatch(setAuthToken(response?.data.access_token));
      navigate("/", { replace: true });
      toast.success("Login successful!");
    } catch (error) {
      console.error("Error submitting form:", error?.message);
      toast.error("Invalid Credentials. Please try again.");
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
            Welcome to Inovex
          </Typography>

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
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-semibold">
              Signup
            </Link>
          </Typography>

          <FormSubmitBtn label="Login" />
        </form>
      </Box>
    </Container>
  );
}
