/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import { GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { ClientColumns } from "../../apps/DataStorage";
import StripedDataGrid from "../commons/StripedDataGrid";

export default function ClientTable({clients}) {
  const navigate = useNavigate();

  return (
    <Box
      className="w-full mb-24"
      sx={{
        "& .super-app-theme--header": {
          backgroundColor: "rgb(238, 245, 255)",
        },
      }}
    >
      <StripedDataGrid
        rows={clients}
        columns={ClientColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        slots={{
          toolbar: GridToolbar,
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        getRowId={(row) => row._id}
        onRowClick={(params) => {
          navigate(`/clientPreview/${params.row._id}`, { state: params.row });
        }}
        sx={{
          '& .MuiTablePagination-root': {
            color: 'primary.main',
          },
        }}
        pageSizeOptions={[5, 10, 15, 20]}
        checkboxSelection
      />
    </Box>
  );
}