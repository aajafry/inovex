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
} from "../src/pages/Index";
import "./App.css";
import { withLayout } from "./components/layout/withLayout";
import themeStore from "./features/theme/themeStore";

function App() {
  let theme = themeStore();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={withLayout(Dashboard)} />
          <Route path="/dashboard" element={withLayout(Dashboard)} />

          <Route path="/services" element={withLayout(Services)} />
          <Route
            path="/servicePreview/:slug"
            element={withLayout(ServicePreview)}
          />

          <Route path="/clients" element={withLayout(Clients)} />
          <Route
            path="/clientPreview/:slug"
            element={withLayout(ClientPreview)}
          />

          <Route path="/tickets" element={withLayout(Tickets)} />
          <Route
            path="/ticketPreview/:slug"
            element={withLayout(TicketPreview)}
          />

          <Route path="/orders" element={withLayout(Orders)} />
          <Route
            path="/orderPreview/:slug"
            element={withLayout(OrderPreview)}
          />

          <Route path="/quotations" element={withLayout(Quotations)} />
          <Route
            path="/quotationPreview/:slug"
            element={withLayout(QuotationPreview)}
          />

          <Route path="/employees" element={withLayout(Employees)} />
          <Route path="/employee/:slug" element={withLayout(EmployeePreview)} />

          <Route path="/invoices" element={withLayout(Invoices)} />
          <Route
            path="/invoicePreview/:slug"
            element={withLayout(InvoicePreview)}
          />

          <Route path="/integrations" element={withLayout(Integrations)} />
          <Route path="/files" element={withLayout(Files)} />

          <Route path="/settings" element={withLayout(Settings)} />

          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;