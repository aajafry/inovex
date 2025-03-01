import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import AddressInput from "../commons/AddressInput";
import FormInput from "../commons/FormInput";
import FormSubmitBtn from "../commons/FormSubmitBtn";
import InputDropzone from "../commons/InputDropzone";

export default function Company() {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Box className="mb-16">
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <FormInput
          label="Company Name"
          name="name"
          register={register}
          required
        />
        {errors.name && (
          <Typography variant="subtitle2" sx={{ color: "error.main" }}>
            This field is required
          </Typography>
        )}

        <FormInput
          label="Company Email"
          name="email"
          register={register}
          required
        />
        {errors.email && (
          <Typography variant="subtitle2" sx={{ color: "error.main" }}>
            This field is required
          </Typography>
        )}

        <Typography variant="subtitle2" component="h6">
          Company Logo
        </Typography>
        <InputDropzone
          isName="logo"
          isRegister={register}
          isRequired={false}
          SetDropzone={setValue}
        />
        {errors.logo && (
          <Typography variant="subtitle2" sx={{ color: "error.main" }}>
            This field is required
          </Typography>
        )}

        <Typography variant="subtitle2" component="h6">
          Company Address
        </Typography>
        <AddressInput register={register} errors={errors} />

        <FormSubmitBtn />
      </form>
    </Box>
  );
}
