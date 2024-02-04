/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";

let FormInput = ({
  label,
  name,
  type,
  required,
  disabled,
  multiline,
  defaultValue,
  onChange,
  register,
}) => (
  <TextField
    label={label}
    variant="outlined"
    type={type ? type : "text"}
    defaultValue={defaultValue && defaultValue}
    onChange={onChange}
    disabled={disabled && disabled}
    multiline={multiline && multiline}
    sx={{ my: 1, pb: 0, width: "100%" }}
    {...register(name, { required })}
  />
);

export default FormInput;
