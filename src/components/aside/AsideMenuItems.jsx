import { Dashboard } from "@mui/icons-material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import DescriptionIcon from "@mui/icons-material/Description";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import FolderIcon from "@mui/icons-material/Folder";
import GroupsIcon from "@mui/icons-material/Groups";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SettingsIcon from "@mui/icons-material/Settings";
import StoreIcon from "@mui/icons-material/Store";

import { Divider, List } from "@mui/material";
import SingleMenuItem from "./SingleMenuItem";

export default function AsideMenuItems() {
  return (
    <List className="">
      <SingleMenuItem ItemName="Dashboard" ItemIcon={<Dashboard />} />
      <SingleMenuItem ItemName="Services" ItemIcon={<DesignServicesIcon />} />
      <SingleMenuItem ItemName="Clients" ItemIcon={<PeopleIcon />} />
      <SingleMenuItem
        ItemName="Tickets"
        ItemIcon={<ConfirmationNumberIcon />}
      />
      <SingleMenuItem ItemName="Orders" ItemIcon={<StoreIcon />} />
      <SingleMenuItem ItemName="Quotations" ItemIcon={<DescriptionIcon />} />
      <SingleMenuItem ItemName="Employees" ItemIcon={<GroupsIcon />} />
      <SingleMenuItem ItemName="Invoices" ItemIcon={<ReceiptIcon />} />
      <SingleMenuItem
        ItemName="Integrations"
        ItemIcon={<IntegrationInstructionsIcon />}
      />
      <SingleMenuItem ItemName="Files" ItemIcon={<FolderIcon />} />
      <Divider />
      <SingleMenuItem
        className="bottom-2 relative"
        ItemName="Settings"
        ItemIcon={<SettingsIcon />}
      />
    </List>
  );
}
