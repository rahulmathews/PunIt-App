// assets
import {
  LoginOutlined,
  ProfileOutlined,
  HomeOutlined,
} from "@ant-design/icons";

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  HomeOutlined,
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: "non-admin",
  title: "Users",
  type: "group",
  children: [
    {
      id: "home",
      title: "Home",
      type: "item",
      url: "/login",
      icon: icons.HomeOutlined,
      target: true,
    },
  ],
};

export default pages;
