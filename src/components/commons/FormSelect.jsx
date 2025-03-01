/* eslint-disable react/prop-types */
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export default function FormSelect({
  label,
  name,
  register,
  required,
  hasTwoValue,
  ValuesOptions,
  setSelectedOrderId,
}) {
  const [valueChange, setValueChange] = useState("");

  return (
    <FormControl fullWidth>
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        label={label}
        labelId={name}
        id={name}
        sx={{ mb: 2, p: 0, width: "100%" }}
        {...register(name, { required })}
        value={valueChange}
        onChange={(e) => {
          setValueChange(e.target.value);
          setSelectedOrderId && setSelectedOrderId(e.target.value);
        }}
      >
        {hasTwoValue &&
          ValuesOptions?.map((value, index) => (
            <MenuItem key={index} value={value._id}>
              {value.name}
            </MenuItem>
          ))}

        {!hasTwoValue &&
          ValuesOptions?.map((value, index) => (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
