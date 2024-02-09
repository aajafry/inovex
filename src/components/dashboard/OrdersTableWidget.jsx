/* eslint-disable react/prop-types */
import StoreIcon from "@mui/icons-material/Store";
import {
    Box,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { OrderColumns } from "../../apps/DataStorage";
import StripedDataGrid from "../commons/StripedDataGrid";


export default function OrdersTableWidget({orders}) {
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
            <StoreIcon />
          </ListItemIcon>
          <ListItemText
            primary="Recent Orders" 
          />
      </ListItem>  
      
      <StripedDataGrid
        rows={orders}
        columns={OrderColumns}
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
          navigate(`/orderPreview/${params.row._id}`, { state: params.row });
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
