/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { QuotationColumns } from "../../apps/DataStorage";
import StripedDataGrid from "../commons/StripedDataGrid";

export default function QuotationTable({quotations}) {
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
        rows={quotations}
        columns={QuotationColumns}
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
          navigate(`/quotationPreview/${params.row._id}`, { state: params.row });
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
