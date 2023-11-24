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

// ==============================|| MENU ITEMS - User ||============================== //

const user = {
  id: "non-admin",
  title: "Users",
  type: "group",
  children: [
    {
      id: "home",
      title: "Home",
      type: "item",
      url: "/home",
      icon: icons.HomeOutlined,
      breadcrumbs: true,
    },
  ],
};

export default user;
