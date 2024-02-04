/* eslint-disable react/prop-types */
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

export default function PreviewProperty({ icon, title, subtitle }) {
  return (
    <ListItem className=" px-0 flex-wrap">
      <ListItemAvatar>
        <Avatar> {icon} </Avatar>
      </ListItemAvatar>
      <ListItemText primary={title} secondary={subtitle} />
    </ListItem>
  );
}
