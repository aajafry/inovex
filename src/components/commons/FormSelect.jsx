/* eslint-disable react/prop-types */
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export default function FormSelect({
  label,
  name,
  register,
  required,
  ValuesOptions,
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
        onChange={(e) => setValueChange(e.target.value)}
      >
        {ValuesOptions?.map((value, index) => (
          <MenuItem key={index} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
