import { useState } from "react";

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

import NewsFeed from "@punit-app/components/news-feed/news-feed";

import MainLayout from "@punit-app/layout/main-layout";
import { useSelector } from "react-redux";

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

const jokes = [
  {
    text: "haha, this is by far the best joke",
    type: "text",
    upvotes: 1203,
    downvotes: 20,
    reports: 5,
    rating: 3.5,
  },
  {
    text: "haha, Second Joke",
    type: "text",
    upvotes: 1003,
    downvotes: 30,
    reports: 7,
    rating: 3.9,
  },
  {
    text: "haha, Third Joke",
    type: "text",
    upvotes: 1445,
    downvotes: 22,
    reports: 14,
    rating: 3.2,
  },
  {
    text: "just, kidding",
    type: "text",
    upvotes: 1948,
    downvotes: 29,
    reports: 21,
    rating: 4.3,
  },
  {
    text: "fake laugh",
    type: "text",
    upvotes: 22019,
    downvotes: 120,
    reports: 34,
    rating: 4.1,
  },
  {
    text: "Leo meme",
    type: "text",
    upvotes: 23409,
    downvotes: 12,
    reports: 19,
    rating: 4.5,
  },
  {
    text: "Another Meme",
    type: "text",
    upvotes: 1902,
    downvotes: 28,
    reports: 3,
    rating: 3.1,
  },
  {
    text: "Another Fake meme",
    type: "text",
    upvotes: 12023,
    downvotes: 222,
    reports: 19,
    rating: 3.6,
  },
  {
    text: "Not so good meme",
    type: "text",
    upvotes: 12030,
    downvotes: 593,
    reports: 55,
    rating: 2.5,
  },
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const Home = () => {
  const [value, setValue] = useState("today");
  const [slot, setSlot] = useState("week");

  const { drawerOpen } = useSelector((state: any) => state.menu);

  return (
    <>
      <MainLayout />
      <Grid
        container
        rowSpacing={4.5}
        columnSpacing={2.75}
        sx={
          drawerOpen ? { ml: "260px", width: "80%" } : { ml: 0, width: "100%" }
        }
      >
        {/* row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Home</Typography>
        </Grid>
        <Grid xs={12} sx={{ mb: -2.25 }}>
          <NewsFeed content={"Haha nice joke"} />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
