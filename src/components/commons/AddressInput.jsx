/* eslint-disable react/prop-types */
import { Grid, Typography } from "@mui/material";
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
          {errors.country && <Typography variant="subtitle2" sx={{color: 'error.main'}}>This field is required</Typography>}
        </Grid>
        <Grid item xs={6}>
          <FormInput label="State" name="state" register={register} required />
          {errors.state && <Typography variant="subtitle2" sx={{color: 'error.main'}}>This field is required</Typography>}
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormInput label="City" name="city" register={register} required />
          {errors.city && <Typography variant="subtitle2" sx={{color: 'error.main'}}>This field is required</Typography>}
        </Grid>
        <Grid item xs={6}>
          <FormInput label="Zip" name="zip" register={register} required />
          {errors.zip && <Typography variant="subtitle2" sx={{color: 'error.main'}}>This field is required</Typography>}
        </Grid>
      </Grid>
    </>
  );
}
