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
          name="companyName"
          register={register}
          required
        />
        {errors.companyName && <p>This field is required</p>}

        <FormInput
          label="Company Email"
          name="companyEmail"
          register={register}
          required
        />
        {errors.companyEmail && <p>This field is required</p>}

        <Typography variant="subtitle2" component="h6">
          Company Address
        </Typography>
        <AddressInput register={register} errors={errors} />

        <Typography variant="subtitle2" component="h6">
          Company Logo
        </Typography>
        <InputDropzone
          isName="companyLogo"
          isRegister={register}
          isRequired={false}
          SetDropzone={setValue}
        />
        {errors.companyLogo && <p>This field is required</p>}

        <FormSubmitBtn />
      </form>
    </Box>
  );
}
