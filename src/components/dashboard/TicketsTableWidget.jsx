/* eslint-disable react/prop-types */
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import {
    Box,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TicketColumns } from "../../apps/DataStorage";
import StripedDataGrid from "../commons/StripedDataGrid";


export default function TicketsTableWidget({tickets}) {
  const navigate = useNavigate(); 

  return (
    <Box
      className="w-full"
      sx={{
        "& .super-app-theme--header": {
           backgroundColor: "secondary.main",
           color: "info.main"
        },
      }}
    >
      <ListItem className=" pl-0">
          <ListItemIcon className=" min-w-fit mr-2">
            <ConfirmationNumberIcon />
          </ListItemIcon>
          <ListItemText
            primary="Recent Tickets" 
          />
      </ListItem>  
      
      <StripedDataGrid
        rows={tickets}
        columns={TicketColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
          columns: {
            columnVisibilityModel: { id: false },
          },
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        getRowId={(row) => row._id}
        onRowClick={(params) => {
          navigate(`/ticketPreview/${params.row._id}`, { state: params.row });
        }}
        sx={{
          '& .MuiDataGrid-footerContainer': {
            display: 'none',
          },
        }}
      />
    </Box>
  );
}
