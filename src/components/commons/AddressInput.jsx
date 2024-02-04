/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import FormInput from "../commons/FormInput";

export default function AddressInput({ register, errors }) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormInput
            label="Country"
            name="country"
            register={register}
            required
          />
          {errors.country && <p>This field is required</p>}
        </Grid>
        <Grid item xs={6}>
          <FormInput label="State" name="state" register={register} required />
          {errors.state && <p>This field is required</p>}
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormInput label="City" name="city" register={register} required />
          {errors.city && <p>This field is required</p>}
        </Grid>
        <Grid item xs={6}>
          <FormInput label="Zip" name="Zip" register={register} required />
          {errors.Zip && <p>This field is required</p>}
        </Grid>
      </Grid>
    </>
  );
}
