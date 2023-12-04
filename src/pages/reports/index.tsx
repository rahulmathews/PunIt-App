import { useMemo, useState } from "react";

// material-ui
import { Grid, Typography } from "@mui/material";

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
      firstName: "Rahul123",
      lastName: "M",
    },
    address: "2",
    city: "Accepted",
    state: "3",
  },
  {
    name: {
      firstName: "Srinivas",
      lastName: "K",
    },
    address: "1",
    city: "Rejected",
    state: "7",
  },
  {
    name: {
      firstName: "Rahul123",
      lastName: "M",
    },
    address: "3",
    city: "Blocked",
    state: "20",
  },
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const Report = () => {
  const [value, setValue] = useState("today");
  const [slot, setSlot] = useState("week");

  const { drawerOpen } = useSelector((state: any) => state.menu);

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "name.firstName", //access nested data with dot notation
        header: "Tracking No",
        // size: 150,
      },
      {
        accessorKey: "name.lastName",
        header: "Reported By",
        // size: 150,
      },
      {
        accessorKey: "address", //normal accessorKey
        header: "Post",
        // size: 200,
      },
      {
        accessorKey: "city",
        header: "Status",
        // size: 150,
      },
      {
        accessorKey: "state",
        header: "Total Reports",
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
          <Typography variant="h5">Reports</Typography>
        </Grid>
        <Grid xs={12} sx={{ mt: 2 }}>
          <MaterialReactTable table={table} />
        </Grid>
      </Grid>
    </>
  );
};

export default Report;
