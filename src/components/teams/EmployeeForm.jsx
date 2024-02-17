/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useSWR from 'swr';
import AddressInput from "../commons/AddressInput";
import FormInput from "../commons/FormInput";
import FormSelect from "../commons/FormSelect";
import FormSubmitBtn from "../commons/FormSubmitBtn";
import InputDropzone from "../commons/InputDropzone";

const EmployeeRoleValues = ["Super Admin", "Admin", "User"];

const URL = `${process.env.USERS_ENDPOINT}/create`;

export default function EmployeeForm() {
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

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
          "Authorization": `Bearer ${authToken.access_token}`,
        },
      });
      // If successful, update the data with SWR
      mutate(response.data, false);
      setIsFormSubmited(true);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };
  
  console.log(formData?.message);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="Employee Name"
        name="name"
        register={register}
        required
      />
      {errors.name && <Typography variant="subtitle2" sx={{color: 'error.main'}}>This field is required</Typography>}

      <FormInput
        label="Employee Email"
        name="email"
        register={register}
        required
      />
      {errors.email && <Typography variant="subtitle2" sx={{color: 'error.main'}}>This field is required</Typography>}

      <FormInput
        label="Password"
        name="password"
        register={register}
        required
      />
      {errors.password && <Typography variant="subtitle2" sx={{color: 'error.main'}}>This field is required</Typography>}

       <Typography variant="subtitle2">Upload User Profile Image </Typography>
      <InputDropzone
        isName="image"
        isRegister={register}
        isRequired={false}
        setDropzone={setValue}
      />
      {errors.attachment && <Typography variant="subtitle2" sx={{color: 'error.main'}}>This field is required</Typography>}


      <Typography variant="subtitle2" component="h6">
        Address
      </Typography>
      <AddressInput register={register} errors={errors} />

      <FormSelect
        label="Employee Role"
        name="role"
        register={register}
        required
        ValuesOptions={EmployeeRoleValues}
      />

      <FormSubmitBtn isdisabled={isFormSubmited} />
    </form>
  );
}
