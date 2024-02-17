/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { clearAuthToken } from "../features/token/tokenSlice";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAuthToken());
    navigate('/login', { replace: true }); 
  };

  useEffect(() => {
    handleLogout();
  }, []); 

  return (
    <Box className="flex justify-center items-center h-full">
      <Typography variant="h4" align="center" className="uppercase" sx={{ color: "secondary.main"}}>Logging out...</Typography>
    </Box>
  );
}
