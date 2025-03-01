/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useSWR from "swr";
import { userSchema } from "../../utility/zodSchema/userSchema";
import AddressInput from "../commons/AddressInput";
import FormInput from "../commons/FormInput";
import FormSubmitBtn from "../commons/FormSubmitBtn";
import InputDropzone from "../commons/InputDropzone";

const URL = `${process.env.USERS_ENDPOINT}/create`;

export default function ClientForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const authToken = useSelector((state) => state.authToken.token);

  const { data: formData, error, mutate } = useSWR([URL, authToken]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("country", data.country);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("zip", data.zip);
    formData.append("role", data.role);
    formData.append("image", data.image[0]);

    try {
      const response = await axios.post(URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });
      // If successful, update the data with SWR
      mutate(response.data, false);
      toast.success("Client created successfully!");
    } catch (error) {
      console.error("Error submitting form:", error.message);
      toast.error("Failed to create client. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="Client Name"
        type="text"
        name="name"
        register={register}
        // required
      />
      {errors.name && (
        <Typography variant="subtitle2" sx={{ color: "error.main" }}>
          {errors.name.message}
        </Typography>
      )}

      <FormInput
        label="Client Email"
        type="email"
        name="email"
        register={register}
        // required
      />
      {errors.email && (
        <Typography variant="subtitle2" sx={{ color: "error.main" }}>
          {errors.email.message}
        </Typography>
      )}

      <FormInput
        label="Password"
        type="password"
        name="password"
        register={register}
        // required
      />
      {errors.password && (
        <Typography variant="subtitle2" sx={{ color: "error.main" }}>
          {errors.password.message}
        </Typography>
      )}

      <Typography variant="subtitle2">Upload User Profile Image </Typography>
      <InputDropzone
        isName="image"
        isRegister={register}
        // isRequired={false}
        setDropzone={setValue}
      />
      {errors.image && (
        <Typography variant="subtitle2" sx={{ color: "error.main" }}>
          {errors.image.message}
        </Typography>
      )}

      <Typography variant="subtitle2" component="h6">
        Address
      </Typography>
      <AddressInput register={register} errors={errors} />

      <FormInput
        label="Default Role Client"
        type="text"
        name="role"
        register={register}
        // required
      />
      {errors.role && (
        <Typography variant="subtitle2" sx={{ color: "error.main" }}>
          {errors.role.message}
        </Typography>
      )}

      <FormSubmitBtn
        label={isSubmitting ? "Loading..." : "Create Client"}
        isdisabled={isSubmitting}
      />
    </form>
  );
}
