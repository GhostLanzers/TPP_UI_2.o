import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  styled,
  Toolbar,
  Typography,
  Button,
  alpha,
  Stack,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

const drawerWidth = 240;
const navItems = ["LIVE", "PROFILE", "COMPANY", "ACCOUNT", "BULK UPLOAD"];

export default function NavBar(props) {
  // Navigating and Access Control
  const navigate = useNavigate();
  const access = !["Recruiter", "Teamlead", "Intern"].includes(
    props.user.employeeType
  );

  // Dropdown JSX
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openpop, setOpenPop] = React.useState(false);
  const handleClickOpen = () => {
    setOpenPop(true);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClicker = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClosePop = () => {
    setOpenPop(false);
  };
  const handleLogout = () => {
    props.setUser();
    localStorage.setItem("user", JSON.stringify({ token: "" }));
    navigate("/login");
  };
  const open = Boolean(anchorEl);
  const openDeleteDrawer = Boolean(anchorEl);

  // Logout JSX
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  // Nav Bar MUI JSX
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
      <Box>
        <Stack direction="column" spacing={0}>
          <Button color="inherit" size="large" onClick={() => navigate("/")}>
            Profile
          </Button>
          <Button
            color="inherit"
            size="large"
            onClick={() => navigate("CompanyDashBoard")}
          >
            Company
          </Button>
          {access && (
            <Button
              color="inherit"
              size="large"
              onClick={() => navigate("AccountDashBoard")}
            >
              Account
            </Button>
          )}
          <Button color="inherit" onClick={handleClicker}>
            {props.user.username}
          </Button>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={openDeleteDrawer}
          >
            <DialogTitle
              sx={{ m: 0, p: 2, textTransform: "uppercase", letterSpacing: 6 }}
              id="customized-dialog-title"
            >
              Confirm Delete
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Typography
                gutterBottom
                sx={{
                  wordBreak: "break-word",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
              >
                Are you Sure that you want to Delete ?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                margin="normal"
                variant="outlined"
                size="medium"
                color="error"
                onClick={handleLogout}
              >
                Delete
              </Button>
              <Button
                autoFocus
                margin="normal"
                variant="outlined"
                size="medium"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </Stack>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar sx={{ backgroundColor: alpha("#0B0B0B", 0.7), height: "8vh" }}>
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
              variant="h6"
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
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => navigate("/")}
                >
                  Profile
                </Button>
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => navigate("CompanyDashBoard")}
                >
                  Company
                </Button>
                {access && (
                  <Button
                    color="inherit"
                    size="small"
                    onClick={() => navigate("AccountDashBoard")}
                  >
                    Account
                  </Button>
                )}
                {props.user.employeeType === "Admin" && (
                  <>
                    <Divider
                      orientation="vertical"
                      variant="middle"
                      color="white"
                      flexItem
                      sx={{ ml: "8px", mr: "8px" }}
                    />
                    <Button
                      color="inherit"
                      size="small"
                      onClick={() => navigate("/bulkupload")}
                    >
                      Bulk Upload
                    </Button>
                  </>
                )}
                <Button
                  color="inherit"
                  onClick={handleClick}
                  aria-controls={open ? "AddOns-Menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  endIcon={<KeyboardDoubleArrowDown />}
                >
                  {props.user.username}
                </Button>
                <Menu
                  id="AddOns-Menu"
                  anchorEl={anchorEl}
                  open={open}
                  MenuListProps={{ "aria-labelledby": "resources-button" }}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClickOpen}>Logout</MenuItem>
                  <MenuItem onClick={() => navigate("/ChangePassword")}>
                    Change Password
                  </MenuItem>
                  {props.user.employeeType === "Admin" && (
                    <MenuItem onClick={() => navigate("/AddExtras")}>
                      Add Extras
                    </MenuItem>
                  )}
                </Menu>
                <Dialog
                  open={openpop}
                  onClose={handleClosePop}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Do You Want to Logout?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleLogout}>Yes</Button>
                    <Button onClick={handleClosePop} autoFocus>
                      No
                    </Button>
                  </DialogActions>
                </Dialog>
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
