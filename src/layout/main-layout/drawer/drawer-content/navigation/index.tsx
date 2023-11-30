// material-ui
import { Box, Typography } from "@mui/material";

// project import
import NavGroup from "./nav-group";
import menuItem from "@punit-app/menu-items";

// project import
import user from "@punit-app/menu-items/user";
import admin from "@punit-app/menu-items/admin";

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const role =
    typeof window !== "undefined" ? window?.localStorage?.getItem("role") : "";

  if (role === "USER") {
    menuItem.items = [user];
  } else {
    menuItem.items = [user, admin];
  }

  const navGroups = menuItem.items.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
