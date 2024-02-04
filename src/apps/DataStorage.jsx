/* eslint-disable no-undef */
const ClientColumns = [
  {
    field: "_id",
    headerName: "Client ID",
    headerClassName: "super-app-theme--header",
    sortable: false,
    editable: false,
    filterable: false,
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
  },
  {
    field: "client",
    headerName: "Client Name",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
    valueGetter: (params) => {
      return params?.row?.client?.name;
    }
  },
  {
    field: "service",
    headerName: "Service Name",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
    valueGetter: (params) => {
      return params?.row?.service?.name;
    }
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
  },
  {
    field: "completedAt",
    headerName: "End Date",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
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
  },
  {
    field: "client",
    headerName: "Client Name",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
    valueGetter: (params) => {
      return params?.row?.client?.name;
    }
  },
  {
    field: "service",
    headerName: "Service Name",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
    valueGetter: (params) => {
      return params?.row?.service?.name;
    }
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
  },
  {
    field: "client",
    headerName: "Client Name",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
    valueGetter: (params) => {
      return params?.row?.client?.name;
    }
  },
  {
    field: "order",
    headerName: "Order ID",
    headerClassName: "super-app-theme--header",
    type: "string",
    editable: false,
    valueGetter: (params) => {
      return params?.row?.order?._id;
    }
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
  },
  {
    field: "client",
    headerName: "Client Name",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
    valueGetter: (params) => {
      return params?.row?.client?.name;
    }
  },
  {
    field: "service",
    headerName: "Service Name",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
    valueGetter: (params) => {
      return params?.row?.service?.name;
    }
  },
  {
    field: "order",
    headerName: "Order ID",
    headerClassName: "super-app-theme--header",
    type: "string",
    editable: false,
    flex: 1,
    valueGetter: (params) => {
      return params?.row?.orderId?._id;
    }
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
  },
];


const ClientRows = [
  {
    id: 1,
    clientName: "Jon",
    clientEmail: "jon@gmail.com",
    clientAddress: "Quiens, New Yourk, USA",
    createdOn: "Oct 11, 2023",
  },
  {
    id: 2,
    clientName: "Mark",
    clientEmail: "mark@gmail.com",
    clientAddress: "Quiens, New Yourk, USA",
    createdOn: "Nov 18, 2023",
  },
  {
    id: 3,
    clientName: "D.Cock",
    clientEmail: "cock@gmail.com",
    clientAddress: "Quiens, New Yourk, USA",
    createdOn: "Feb 12, 2023",
  },
  {
    id: 4,
    clientName: "Smith",
    clientEmail: "smith@gmail.com",
    clientAddress: "Quiens, New Yourk, USA",
    createdOn: "Jan 10, 2023",
  },
  {
    id: 5,
    clientName: "Rick",
    clientEmail: "Rick@gmail.com",
    clientAddress: "Quiens, New Yourk, USA",
    createdOn: "May 15, 2023",
  },
  {
    id: 6,
    clientName: "Pual",
    clientEmail: "pual@gmail.com",
    clientAddress: "Quiens, New Yourk, USA",
    createdOn: "Dec 11, 2023",
  },
  {
    id: 7,
    clientName: "Jack",
    clientEmail: "jack@gmail.com",
    clientAddress: "Quiens, New Yourk, USA",
    createdOn: "Sep 25, 2023",
  },
  {
    id: 8,
    clientName: "Tailor",
    clientEmail: "tailor@gmail.com",
    clientAddress: "Quiens, New Yourk, USA",
    createdOn: "Jun 21, 2023",
  },
  {
    id: 9,
    clientName: "Tramp",
    clientEmail: "tramp@gmail.com",
    clientAddress: "Quiens, New Yourk, USA",
    createdOn: "05 Jan, 2024",
  },
];

const OrderRows = [
  {
    id: 1,
    clientName: "Jon",
    serviceName: "Content Marketing",
    status: "Ongoing",
    kickOfDate: "Oct 11, 2023",
    endDate: "Apr 11, 2024",
  },
  {
    id: 2,
    clientName: "Mark",
    serviceName: "Content Marketing",
    status: "Ongoing",
    kickOfDate: "Oct 11, 2023",
    endDate: "Apr 11, 2024",
  },
  {
    id: 3,
    clientName: "Don",
    serviceName: "Content Marketing",
    status: "Process",
    kickOfDate: "Oct 11, 2023",
    endDate: "Apr 11, 2024",
  },
];

const QuotationRows = [
  {
    id: 1,
    clientName: "Jon",
    serviceName: "Content Marketing",
    quantity: 1,
    budget: 90,
  },
  {
    id: 2,
    clientName: "Mark",
    serviceName: "Content Marketing",
    quantity: 3,
    budget: 450,
  },
];

const EmployeeRows = [
  {
    id: 1,
    employeeName: "Jon",
    employeeEmail: "Jon@gmail.com",
    employeeRole: "Super Admin",
  },
  {
    id: 2,
    employeeName: "Mark",
    employeeEmail: "mark@gmail.com",
    employeeRole: "Creator",
  },
  {
    id: 3,
    employeeName: "Smith",
    employeeEmail: "smith@gmail.com",
    employeeRole: "Admin",
  },
];

const TicketRows = [
  {
    id: 1,
    clientName: "Jon",
    orderId: 8,
    subject: "Content Marketing",
    status: "Process",
    priority: "High",
  },
  {
    id: 2,
    clientName: "Mark",
    orderId: 13,
    subject: "Digital Marketing",
    status: "Process",
    priority: "medium",
  },
];

const InvoiceRows = [
  {
    id: 1,
    clientName: "Jon",
    serviceName: "Content Marketing",
    orderId: 23,
    status: "Paid",
    createdOn: "27 Feb 2024",
  },
  {
    id: 2,
    clientName: "Mark",
    serviceName: "Content Marketing",
    orderId: 533,
    status: "Due",
    createdOn: "27 Jan 2024",
  },
  {
    id: 3,
    clientName: "Don",
    serviceName: "Content Marketing",
    orderId: 735,
    status: "Due",
    createdOn: "05 Jan 2024",
  },
];

export {
  ClientColumns,
  ClientRows, EmployeeColumns,
  EmployeeRows, InvoiceColumns,
  InvoiceRows,
  OrderColumns,
  OrderRows,
  QuotationColumns,
  QuotationRows, TicketColumns,
  TicketRows
};

