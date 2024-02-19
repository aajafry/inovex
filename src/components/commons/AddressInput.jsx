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
            type="text"
            name="country"
            register={register}
            // required
          />
          {errors.country && <Typography variant="subtitle2" sx={{color: 'error.main'}}>{errors.country.message}</Typography>}
        </Grid>
        <Grid item xs={6}>
          <FormInput 
            label="State"
            type="text" 
            name="state" 
            register={register} 
            // required 
          />
          {errors.state && <Typography variant="subtitle2" sx={{color: 'error.main'}}>{errors.state.message}</Typography>}
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormInput 
            label="City"
            type="text" 
            name="city" 
            register={register} 
            // required 
          />
          {errors.city && <Typography variant="subtitle2" sx={{color: 'error.main'}}>{errors.city.message}</Typography>}
        </Grid>
        <Grid item xs={6}>
          <FormInput 
            label="Zip"
            type="number" 
            name="zip" 
            register={register} 
            // required 
          />
          {errors.zip && <Typography variant="subtitle2" sx={{color: 'error.main'}}>{errors.zip.message}</Typography>}
        </Grid>
      </Grid>
    </>
  );
}
