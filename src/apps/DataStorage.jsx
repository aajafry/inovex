/* eslint-disable no-undef */
import moment from "moment";

const ClientColumns = [
  {
    field: "_id",
    headerName: "Client ID",
    headerClassName: "super-app-theme--header",
    sortable: false,
    editable: false,
    filterable: false,
    valueGetter: (params) => {
      return params?.row?._id.slice(0, 6);
    },
  },
  {
    field: "name",
    headerName: "Client Name",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Client Email",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
  },
  {
    field: "address",
    headerName: "Client Address",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Created On",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
    valueGetter: (params) => {
      return moment(params?.row?.createdAt).format("MMM DD, YYYY");
    },
  },
];

const OrderColumns = [
  {
    field: "_id",
    headerName: "Order ID",
    headerClassName: "super-app-theme--header",
    sortable: false,
    editable: false,
    filterable: false,
    valueGetter: (params) => {
      return params?.row?._id.slice(0, 6);
    },
  },
  {
    field: "client",
    headerName: "Client Name",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
    valueGetter: (params) => {
      return params?.row?.client?.name;
    },
  },
  {
    field: "service",
    headerName: "Service Name",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
    valueGetter: (params) => {
      return params?.row?.service?.name;
    },
  },
  {
    field: "status",
    headerName: "Status",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
  },
  {
    field: "openedAt",
    headerName: "Kick Of Date",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
    valueGetter: (params) => {
      return moment(params?.row?.openedAt).format("MMM DD, YYYY");
    },
  },
  {
    field: "completedAt",
    headerName: "End Date",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
    valueGetter: (params) => {
      return moment(params?.row?.completedAt).format("MMM DD, YYYY");
    },
  },
];

const QuotationColumns = [
  {
    field: "_id",
    headerName: "Quotation ID",
    headerClassName: "super-app-theme--header",
    sortable: false,
    editable: false,
    filterable: false,
    valueGetter: (params) => {
      return params?.row?._id.slice(0, 6);
    },
  },
  {
    field: "client",
    headerName: "Client Name",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
    valueGetter: (params) => {
      return params?.row?.client?.name;
    },
  },
  {
    field: "service",
    headerName: "Service Name",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
    valueGetter: (params) => {
      return params?.row?.service?.name;
    },
  },
  {
    field: "quantity",
    headerName: "Quantity",
    headerClassName: "super-app-theme--header",
    type: "number",
    flex: 1,
  },
  {
    field: "budget",
    headerName: "Budget",
    headerClassName: "super-app-theme--header",
    type: "number",
    flex: 1,
  },
];

const EmployeeColumns = [
  {
    field: "_id",
    headerName: "Employee ID",
    headerClassName: "super-app-theme--header",
    sortable: false,
    editable: false,
    filterable: false,
    hide: true,
    valueGetter: (params) => {
      return params?.row?._id.slice(0, 6);
    },
  },
  {
    field: "name",
    headerName: "Employee Name",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Employee Email",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
  },
  {
    field: "role",
    headerName: "Employee Role",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
  },
];

const TicketColumns = [
  {
    field: "_id",
    headerName: "Ticket ID",
    headerClassName: "super-app-theme--header",
    sortable: false,
    editable: false,
    filterable: false,
    valueGetter: (params) => {
      return params?.row?._id.slice(0, 6);
    },
  },
  {
    field: "client",
    headerName: "Client Name",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
    valueGetter: (params) => {
      return params?.row?.client?.name;
    },
  },
  {
    field: "order",
    headerName: "Order ID",
    headerClassName: "super-app-theme--header",
    type: "string",
    editable: false,
    valueGetter: (params) => {
      return params?.row?.order?._id.slice(0, 6);
    },
  },
  {
    field: "subject",
    headerName: "Subject",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
  },
  {
    field: "priority",
    headerName: "Priority",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
  },
];

const InvoiceColumns = [
  {
    field: "_id",
    headerName: "Invoice ID",
    headerClassName: "super-app-theme--header",
    sortable: false,
    editable: false,
    filterable: false,
    flex: 1,
    valueGetter: (params) => {
      return params?.row?._id.slice(0, 6);
    },
  },
  {
    field: "client",
    headerName: "Client Name",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
    valueGetter: (params) => {
      return params?.row?.client?.name;
    },
  },
  {
    field: "service",
    headerName: "Service Name",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
    valueGetter: (params) => {
      return params?.row?.service?.name;
    },
  },
  {
    field: "order",
    headerName: "Order ID",
    headerClassName: "super-app-theme--header",
    type: "string",
    editable: false,
    flex: 1,
    valueGetter: (params) => {
      return params?.row?.order?._id.slice(0, 6);
    },
  },
  {
    field: "status",
    headerName: "Status",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Created On",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
    valueGetter: (params) => {
      return moment(params?.row?.createdAt).format("MMM DD, YYYY");
    },
  },
];

export {
  ClientColumns,
  EmployeeColumns,
  InvoiceColumns,
  OrderColumns,
  QuotationColumns,
  TicketColumns,
};
