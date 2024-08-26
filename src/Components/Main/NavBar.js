import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Button,
  alpha,
  Stack,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../Assets/Features/User/userSlice";

const drawerWidth = 240;

export default function NavBar(props) {
  // Navigating and Access Control
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { employeeType, username } = useSelector((state) => state.user);
  const access = !["Recruiter", "Teamlead", "Intern"].includes(employeeType);

  // Dropdown logout JSX
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [openpop, setOpenPop] = React.useState(false);
  const [openpopDrawer, setOpenPopDrawer] = React.useState(false);
  const handleClickOpen = () => {
    setOpenPop(true);
  };
  const handleClickOpenDrawer = () => {
    setOpenPopDrawer(true);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClosePop = () => {
    setOpenPop(false);
  };
  const handleClosePopDrawer = () => {
    setOpenPopDrawer(false);
  };
  const handleLogout = () => {
    dispatch(
      setUser({ employeeType: "", username: "", userMail: "", userid: "" })
    );
    localStorage.setItem("user", JSON.stringify({ token: "" }));
    navigate("/login");
  };
  const open = Boolean(anchorEl);

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
          <Button color="inherit" onClick={handleClickOpenDrawer}>
            {username}
          </Button>
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
              <Stack direction="row" spacing={1}>
                <Button
                  color="inherit"
                  size="small"
                  sx={{ fontWeight: "bold", color: "rgb(0, 204, 255)", fontSize: "1.2rem", letterSpacing: "10px"}}
                  onClick={() => navigate("/live")}
                >
                  Live
                </Button>
                <Button
                  color="inherit"
                  size="small"
                  sx={{
                    fontWeight: "bold",
                    textDecoration: location.pathname === "/" ? "underline" : "none",
                    fontSize: location.pathname === "/" ? "1rem" : "0.8125rem",
                  }}
                  onClick={() => navigate("/")}
                >
                  Profile
                </Button>
                <Button
                  color="inherit"
                  size="small"
                  sx={{
                    fontWeight: "bold",
                    textDecoration: location.pathname === "/Company" ? "underline" : "none",
                    fontSize: location.pathname === "/Company" ? "1rem" : "0.8125rem",
                  }}
                  onClick={() => navigate("Company")}
                >
                  Company
                </Button>
                {access && (
                  <Button
                    color="inherit"
                    size="small"
                    sx={{
                      fontWeight: "bold",
                      textDecoration:
                        location.pathname === "/Account"
                          ? "underline"
                          : "none",
                      fontSize:
                        location.pathname === "/Account"
                          ? "1rem"
                          : "0.8125rem",
                    }}
                    onClick={() => navigate("Account")}
                  >
                    Account
                  </Button>
                )}
                {employeeType === "Admin" && (
                  <>
                    <Divider
                      orientation="vertical"
                      variant="middle"
                      color="white"
                      flexItem
                    />
                    <Button
                      color="inherit"
                      size="small"
                      sx={{
                        fontWeight: "bold",
                        textDecoration:
                          location.pathname === "/bulkupload"
                            ? "underline"
                            : "none",
                        fontSize:
                          location.pathname === "/bulkupload"
                            ? "1rem"
                            : "0.8125rem",
                      }}
                      onClick={() => navigate("/bulkupload")}
                    >
                      Bulk Upload
                    </Button>
                  </>
                )}
                <Divider
                  orientation="vertical"
                  variant="middle"
                  color="white"
                  flexItem
                />
                <Button
                  color="inherit"
                  onClick={handleClick}
                  aria-controls={open ? "AddOns-Menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  sx={{ fontWeight: "bold" }}
                  endIcon={<KeyboardDoubleArrowDown />}
                >
                  {username}
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
                  {employeeType === "Admin" && (
                    <MenuItem onClick={() => navigate("/AddExtras")}>
                      Add Extras
                    </MenuItem>
                  )}
                </Menu>
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
      <Dialog
        open={openpop}
        onClose={handleClosePop}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          backgroundColor: "transparent",
          "& .MuiDialog-paper": {
            backgroundColor: "transparent",
            backdropFilter: "blur(100px)",
            boxShadow: "none",
            color: "white",
          },
        }}
      >
        <DialogTitle
          sx={{
            p: 2,
            textTransform: "uppercase",
            letterSpacing: 6,
          }}
          id="customized-dialog-title"
        >
          Logout
        </DialogTitle>
        <DialogContent
          dividers
          className="dw"
        >
          <IconButton
            aria-label="close"
            onClick={handleClosePop}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            gutterBottom
            sx={{
              wordBreak: "break-word",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            Hey {username}, confirm your Logout!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
          <Button variant="contained" onClick={handleClosePop}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openpopDrawer}
        onClose={handleClosePopDrawer}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          backgroundColor: "transparent",
          "& .MuiDialog-paper": {
            backgroundColor: "transparent",
            backdropFilter: "blur(100px)",
            boxShadow: "none",
            color: "white",
          },
        }}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, textTransform: "uppercase", letterSpacing: 6 }}
          id="customized-dialog-title"
        >
          Logout
        </DialogTitle>
        <DialogContent
          dividers
          className="dw"
        >
          <IconButton
            aria-label="close"
            onClick={handleClosePopDrawer}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            gutterBottom
            sx={{
              wordBreak: "break-word",
            }}
          >
            For {employeeType === "Admin" && "Add Extras and"} Password Change
            use Tab/Laptop.
          </Typography>
          <Typography
            gutterBottom
            sx={{
              wordBreak: "break-word",
              fontWeight: "bold",
            }}
          >
            Hey {username}, confirm your Logout!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
          <Button variant="contained" onClick={handleClosePopDrawer}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
