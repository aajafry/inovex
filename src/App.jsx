import { ThemeProvider } from "@mui/material/styles";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  ClientPreview,
  Clients,
  Dashboard,
  EmployeePreview,
  Employees,
  Files,
  Integrations,
  InvoicePreview,
  Invoices,
  Login,
  Logout,
  Notfound,
  OrderPreview,
  Orders,
  QuotationPreview,
  Quotations,
  ServicePreview,
  Services,
  Settings,
  TicketPreview,
  Tickets,
  Signup
} from "../src/pages/Index";
import "./App.css";
import { withProtectedLayout } from "./components/layout/withProtectedLayout";

import themeStore from "./features/theme/themeStore";

function App() {
  let theme = themeStore();
  return (
    
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          
          
          <Route path="/" element={withProtectedLayout(Dashboard)} />
          <Route path="/dashboard" element={withProtectedLayout(Dashboard)} />

          <Route path="/services" element={withProtectedLayout(Services)} />
          <Route
            path="/servicePreview/:slug"
            element={withProtectedLayout(ServicePreview)}
          />

          <Route path="/clients" element={withProtectedLayout(Clients)} />
          <Route
            path="/clientPreview/:slug"
            element={withProtectedLayout(ClientPreview)}
          />

          <Route path="/tickets" element={withProtectedLayout(Tickets)} />
          <Route
            path="/ticketPreview/:slug"
            element={withProtectedLayout(TicketPreview)}
          />

          <Route path="/orders" element={withProtectedLayout(Orders)} />
          <Route
            path="/orderPreview/:slug"
            element={withProtectedLayout(OrderPreview)}
          />

          <Route path="/quotations" element={withProtectedLayout(Quotations)} />
          <Route
            path="/quotationPreview/:slug"
            element={withProtectedLayout(QuotationPreview)}
          />

          <Route path="/employees" element={withProtectedLayout(Employees)} />
          <Route path="/employee/:slug" element={withProtectedLayout(EmployeePreview)} />

          <Route path="/invoices" element={withProtectedLayout(Invoices)} />
          <Route
            path="/invoicePreview/:slug"
            element={withProtectedLayout(InvoicePreview)}
          />

          <Route path="/integrations" element={withProtectedLayout(Integrations)} />
          <Route path="/files" element={withProtectedLayout(Files)} />

          <Route path="/settings" element={withProtectedLayout(Settings)} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;