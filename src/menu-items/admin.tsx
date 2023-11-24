// assets
import {
  DashboardOutlined,
  UserOutlined,
  BarChartOutlined,
  CommentOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

// icons
const icons = {
  DashboardOutlined,
  UserOutlined,
  BarChartOutlined,
  CommentOutlined,
  ExclamationCircleOutlined,
};

// ==============================|| MENU ITEMS - ADMIN ||============================== //

const admin = {
  id: "group-dashboard",
  title: "Admin",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "Dashboard",
      type: "item",
      url: "/dashboard",
      icon: icons.BarChartOutlined,
      breadcrumbs: true,
    },
    {
      id: "users",
      title: "Users",
      type: "item",
      url: "/users",
      icon: icons.UserOutlined,
      breadcrumbs: true,
    },
    {
      id: "posts",
      title: "Posts",
      type: "item",
      url: "/posts",
      icon: icons.CommentOutlined,
      breadcrumbs: true,
    },
    {
      id: "reports",
      title: "Reports",
      type: "item",
      url: "/reports",
      icon: icons.ExclamationCircleOutlined,
      breadcrumbs: true,
    },
  ],
};

export default admin;
