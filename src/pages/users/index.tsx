import { useMemo, useState } from "react";

// material-ui
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// project import
import OrdersTable from "@punit-app/components/tables/orders-table";
import IncomeAreaChart from "@punit-app/components/charts/income-area-chart";
import MonthlyBarChart from "@punit-app/components/charts/monthly-bar-chart";
import ReportAreaChart from "@punit-app/components/charts/report-area-chart";
import SalesColumnChart from "@punit-app/components/charts/sales-column-chart";
import MainCard from "@punit-app/components/cards/main-card";
import AnalyticEcommerce from "@punit-app/components/stats/analytics-ecommerce";

// assets
import {
  GiftOutlined,
  MessageOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import MainLayout from "@punit-app/layout/main-layout";
import { useSelector } from "react-redux";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: "1rem",
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: "auto",
  right: "auto",
  alignSelf: "flex-start",
  transform: "none",
};

// sales report status
const status = [
  {
    value: "today",
    label: "Today",
  },
  {
    value: "month",
    label: "This Month",
  },
  {
    value: "year",
    label: "This Year",
  },
];

type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    address: "261 Erdman Ford",
    city: "East Daphne",
    state: "Kentucky",
  },
  {
    name: {
      firstName: "Jane",
      lastName: "Doe",
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Joe",
      lastName: "Doe",
    },
    address: "566 Brakus Inlet",
    city: "South Linda",
    state: "West Virginia",
  },
  {
    name: {
      firstName: "Kevin",
      lastName: "Vandy",
    },
    address: "722 Emie Stream",
    city: "Lincoln",
    state: "Nebraska",
  },
  {
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs",
    },
    address: "32188 Larkin Turnpike",
    city: "Omaha",
    state: "Nebraska",
  },
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const User = () => {
  const { drawerOpen } = useSelector((state: any) => state.menu);

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "name.firstName", //access nested data with dot notation
        header: "First Name",
        // size: 150,
      },
      {
        accessorKey: "name.lastName",
        header: "Last Name",
        // size: 150,
      },
      {
        accessorKey: "address", //normal accessorKey
        header: "Address",
        // size: 200,
      },
      {
        accessorKey: "city",
        header: "City",
        // size: 150,
      },
      {
        accessorKey: "state",
        header: "State",
        // size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    muiTableProps: {
      sx: {
        border: "1px solid #1677ff",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        border: "1px solid #1677ff",
        fontStyle: "italic",
        fontWeight: "normal",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: "1px solid #1677ff",
      },
    },
  });

  return (
    <>
      <MainLayout />
      <Grid
        container
        columnSpacing={2.75}
        sx={
          drawerOpen ? { ml: "265px", width: "80%" } : { ml: 5, width: "95%" }
        }
      >
        {/* row 1 */}
        <Grid item xs={12} sx={{}}>
          <Typography variant="h5">Users</Typography>
        </Grid>
        <Grid xs={12} sx={{ mt: 2 }}>
          <MaterialReactTable table={table} />
        </Grid>
      </Grid>
    </>
  );
};

export default User;
