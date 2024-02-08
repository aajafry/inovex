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
import { withProtected } from "./components/layout/withProtected";

import themeStore from "./features/theme/themeStore";

function App() {
  let theme = themeStore();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={withProtected(withLayout(Dashboard))} />
          <Route path="/dashboard" element={withProtected(withLayout(Dashboard))} />

          <Route path="/services" element={withProtected(withLayout(Services))} />
          <Route
            path="/servicePreview/:slug"
            element={withProtected(withLayout(ServicePreview))}
          />

          <Route path="/clients" element={withProtected(withLayout(Clients))} />
          <Route
            path="/clientPreview/:slug"
            element={withProtected(withLayout(ClientPreview))}
          />

          <Route path="/tickets" element={withProtected(withLayout(Tickets))} />
          <Route
            path="/ticketPreview/:slug"
            element={withProtected(withLayout(TicketPreview))}
          />

          <Route path="/orders" element={withProtected(withLayout(Orders))} />
          <Route
            path="/orderPreview/:slug"
            element={withProtected(withLayout(OrderPreview))}
          />

          <Route path="/quotations" element={withProtected(withLayout(Quotations))} />
          <Route
            path="/quotationPreview/:slug"
            element={withProtected(withLayout(QuotationPreview))}
          />

          <Route path="/employees" element={withProtected(withLayout(Employees))} />
          <Route path="/employee/:slug" element={withProtected(withLayout(EmployeePreview))} />

          <Route path="/invoices" element={withProtected(withLayout(Invoices))} />
          <Route
            path="/invoicePreview/:slug"
            element={withProtected(withLayout(InvoicePreview))}
          />

          <Route path="/integrations" element={withProtected(withLayout(Integrations))} />
          <Route path="/files" element={withProtected(withLayout(Files))} />

          <Route path="/settings" element={withProtected(withLayout(Settings))} />

          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;