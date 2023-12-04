import { useEffect, useMemo, useState } from "react";

// material-ui
import {
  Alert,
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
  Snackbar,
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
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";

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

//nested data is ok, see accessorKeys in ColumnDef below

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const User = () => {
  const { drawerOpen } = useSelector((state: any) => state.menu);
  const [data, setData] = React.useState([]);

  const [success, setSuccess] = React.useState<any>(null);

  const handleClose = (event: React.SyntheticEvent | Event) => {
    setSuccess({ open: false });
  };

  const router = useRouter();

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "firstName", //access nested data with dot notation
        header: "First Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "status", //normal accessorKey
        header: "Status",
        Cell: ({ cell }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              ...(cell.getValue() === "ACTIVE"
                ? { bgcolor: "green" }
                : { bgcolor: "red" }),
              padding: "10px",
              borderRadius: "10px",
              color: "white",
            }}
          >
            {cell.getValue() as any}
          </Box>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "block",
        header: "Block",
        Cell: ({ cell }) => (
          // <Box component="span">
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={() => {}}
          >
            Block
          </Button>
          // </Box>
        ),
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

  const token =
    typeof window !== "undefined"
      ? window?.localStorage?.getItem("access_token")
      : "";

  const fetchUsers = async () => {
    const queryUrl = `${process.env.NEXT_PUBLIC_API_SERVER}/api/users`;

    const data = await axios
      .get(queryUrl, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        return response.data;
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setSuccess({
            open: true,
            success: false,
            message: "Session timed out",
          });
          window.localStorage.removeItem("access_token");
          router.push("/auth");
          return;
        }

        setSuccess({
          open: true,
          success: false,
          message: "Internal Server error",
        });
      });

    if (data) {
      setSuccess({
        open: true,
        success: true,
        message: "Fetched the latest Jokes",
      });
    }
  };

  const blockUser = async (userId: any) => {
    const queryUrl = `${process.env.NEXT_PUBLIC_API_SERVER}/api/users/${userId}`;

    const data = await axios
      .post(
        queryUrl,
        {
          status: "BLOCKED",
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setData(response.data);
        return response.data;
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setSuccess({
            open: true,
            success: false,
            message: "Session timed out",
          });
          window.localStorage.removeItem("access_token");
          router.push("/auth");
          return;
        }

        setSuccess({
          open: true,
          success: false,
          message: "Internal Server error",
        });
      });

    if (data) {
      setSuccess({
        open: true,
        success: true,
        message: "Fetched the latest Jokes",
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={success?.open}
        autoHideDuration={8000}
        onClose={(e) => handleClose(e)}
      >
        <Alert
          onClose={handleClose}
          severity={success?.success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {success?.message}
        </Alert>
      </Snackbar>
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
