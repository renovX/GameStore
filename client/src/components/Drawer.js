import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SettingsIcon from "@mui/icons-material/Settings";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import LogoutIcon from "@mui/icons-material/Logout";
import LogintIcon from "@mui/icons-material/Login";
import CreateIcon from "@mui/icons-material/Create";
import Cookies from "js-cookie";
import { DrawerContext } from "../Context/DrawerContext";
import { LoginContext } from "../Context/LoginContext";
const iconArray = [
  <ManageAccountsIcon />,
  <Diversity1Icon />,
  <SportsEsportsIcon />,
  <ShoppingCartIcon />,
  <SettingsIcon />,
  <LogoutIcon />,
];

export default function TemporaryDrawer() {
  const { drawer, setDrawer } = React.useContext(DrawerContext);
  const { profileData, setProfile } = React.useContext(LoginContext);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [loginState, setLogin] = React.useState(false);
  const navigate = useNavigate();
  const toggleDrawer = (anchor) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: !state[anchor] });
  };
  const handleLogin = () => {
    setState({ ...state, [anchor]: false });
    setProfile({});
    navigate("/auth/signin");
  };
  const handleLogout = async () => {
    setDrawer(false);
    setState({ ...state, [anchor]: false });
    const url = `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/auth/logout`;
    Cookies.remove("token");
    await axios.post(url, { cart: profileData.cart, email: profileData.email });
    console.log(profileData.cart[0]);
    navigate("/");
  };
  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        bgcolor: "grey",
        mt: "24%",
      }}
      role="presentation"
      /*onClick={toggleDrawer(anchor, true)}*/
      onKeyDown={toggleDrawer(anchor)}
    >
      {drawer ? (
        <List>
          {[
            { text: "Account", nav: "/profile/account" },
            { text: "Friends", nav: "/profile/account" },
            { text: "Library", nav: "/profile/library" },
            { text: "Cart", nav: "/profile/cart/k" },
            { text: "Setting", nav: "/profile/account" },
          ].map(({ text, nav }, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => {
                  setState({ ...state, [anchor]: false });
                  navigate(nav);
                  toggleDrawer(anchor);
                }}
              >
                <ListItemIcon>{iconArray[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem key="Logout" disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={
                //setLogin(true);
                handleLogin
              }
            >
              <ListItemIcon>
                <LogintIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setState({ ...state, [anchor]: false });
                navigate("/auth/register");
              }}
            >
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Box>
  );
  const anchor = "right";
  return (
    <React.Fragment key={anchor}>
      <Button
        sx={{ color: "white", p: 0, textTransform: "none" }}
        onClick={toggleDrawer(anchor)}
      >
        Profile
      </Button>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        {list(anchor)}
      </Drawer>
    </React.Fragment>
  );
}
