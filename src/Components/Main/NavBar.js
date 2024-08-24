import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  alpha,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const navItems = ["LIVE", "PROFILE", "COMPANY", "ACCOUNT", "BULK UPLOAD"];

export default function NavBar(props) {
  const { window } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h5" sx={{ my: 2, fontWeight: "bold" }}>
        THE PLACEMENT PARK
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              component={Link}
              to={
                item === "PROFILE"
                  ? "/"
                  : item
                      .split(" ")
                      ?.reduce((a, b) => a + b)
                      .toLowerCase()
              }
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar sx={{ backgroundColor: alpha("#0B0B0B", 0.7) }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              component="div"
              letterSpacing="5px"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                fontWeight: "bold",
              }}
            >
              THE PLACEMENT PARK
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Stack direction="row" spacing={0}>
                {navItems.map((item) => (
                  <Button
                    key={item}
                    component={Link}
                    to={
                      item === "PROFILE"
                        ? "/"
                        : item
                            .split(" ")
                            ?.reduce((a, b) => a + b)
                            .toLowerCase()
                    }
                    sx={{ color: "#fff" }}
                  >
                    {item}
                  </Button>
                ))}
                <Divider
                  orientation="vertical"
                  variant="middle"
                  color="white"
                  flexItem
                  sx={{ margin: 1 }}
                />
                <Button sx={{ color: "#fff" }}>NAME</Button>
              </Stack>
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                color: "white",
                backgroundColor: alpha("#0b0b0b", 0.5),
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </>
  );
}
