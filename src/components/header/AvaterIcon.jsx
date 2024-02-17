/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import useSWR from 'swr';
import { fetcher } from "../../utility/fetcher";

const userURL = process.env.USERS_ENDPOINT;

export default function AvatarIcon({ handleOpenUserMenu }) {
  const authToken = useSelector((state) => state.authToken.token);
  const decoded = jwtDecode(authToken?.access_token);
  const { userEmail } = decoded;

  const { data: users } = useSWR([userURL, authToken], ([userURL, authToken]) => fetcher(userURL, authToken.access_token))
  const userData = users?.users?.filter((user) => user?.email === userEmail);
  
  return (
    <Tooltip title="Open Avater">
      <IconButton onClick={handleOpenUserMenu}>
        <Avatar
          alt={userData && userData[0]?.name} 
          src={userData && userData[0]?.image} 
        />
      </IconButton>
    </Tooltip>
  );
}
