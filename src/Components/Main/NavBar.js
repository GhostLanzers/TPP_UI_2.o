import React from "react";
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
  Tooltip,
  Avatar,
  ListItemIcon,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import Settings from "@mui/icons-material/Settings";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import Logout from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../Assets/Features/User/userSlice";
import img from "../../Assets/./Park_Logo.png";

const drawerWidth = 240;

export default function NavBar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { employeeType, username } = useSelector((state) => state.user);
  const access = !["Recruiter", "Teamlead", "Intern"].includes(employeeType);

  // Logout dropdown
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openpop, setOpenPop] = React.useState(false);
  const [openpopDrawer, setOpenPopDrawer] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleClickOpen = () => setOpenPop(true);
  const handleClosePop = () => setOpenPop(false);
  const handleClickOpenDrawer = () => setOpenPopDrawer(true);
  const handleClosePopDrawer = () => setOpenPopDrawer(false);
  const handleLogout = () => {
    dispatch(setUser({ employeeType: "", username: "", userMail: "", userid: "" }));
    localStorage.setItem("user", JSON.stringify({ token: "" }));
    navigate("/login");
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  // Live link styling
  const liveLink = {
    fontWeight: "bold",
    color: "rgb(0, 204, 255)",
    fontSize: "2.8vh",
    letterSpacing: "8px",
  };
  const normalLink = {
    fontWeight: "bold",
    color: "white",
    fontSize: "1.7vh",
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h5" sx={{ my: 2, fontWeight: "bold", color: "white" }}>
        THE PLACEMENT PARK
      </Typography>
      <Divider sx={{ borderColor: "white" }} />
      <Box>
        <Stack direction="column" spacing={2} paddingTop={3}>
          <Button sx={{ color: "white" }} onClick={() => navigate("/")}>Profile</Button>
          <Button sx={{ color: "white" }} onClick={() => navigate("companydashboard")}>Company</Button>
          {access && <Button sx={{ color: "white" }} onClick={() => navigate("accountdashboard")}>Account</Button>}
          <Button sx={{ color: "white" }} onClick={() => navigate("/ChangePassword")}>Change Password</Button>
          <Button sx={{ color: "white" }} onClick={handleClickOpenDrawer}>{username}</Button>
        </Stack>
      </Box>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar sx={{ backgroundColor: alpha("#0B0B0B", 0.7), height: "7vh", justifyContent: "center" }}>
          <Toolbar>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }} onClick={handleDrawerToggle}>
                <Avatar alt="THE PLACEMENT PARK LOGO" src={img} sx={{ width: "max-content" }} />
              </IconButton>
            </Tooltip>

            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                ml: 1,
                display: { xs: "none", sm: "block" },
                fontWeight: "bold",
                fontSize: { sm: "2vh", md: "3vh" },
                color: "white",
                letterSpacing: "8px",
              }}
            >
              THE PLACEMENT PARK
            </Typography>

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Stack direction="row" spacing={1}>
                <Button
                  color="inherit"
                  size="small"
                  sx={location.pathname.toLowerCase().search("candidate") !== -1 || location.pathname.toLowerCase().search("profile") !== -1 || location.pathname.toLowerCase().search("leads") !== -1 || location.pathname === "/" ? liveLink : normalLink}
                  onClick={() => navigate("/")}
                >
                  Profile
                </Button>
                <Button
                  color="inherit"
                  size="small"
                  sx={location.pathname.toLowerCase().includes("company") ? liveLink : normalLink}
                  onClick={() => navigate("/companydashboard")}
                >
                  Company
                </Button>
                {access && (
                  <Button
                    color="inherit"
                    size="small"
                    sx={location.pathname.toLowerCase().includes("account") ? liveLink : normalLink}
                    onClick={() => navigate("/accountdashboard")}
                  >
                    Account
                  </Button>
                )}
                {employeeType === "Admin" && (
                  <>
                    <Divider orientation="vertical" color="white" flexItem />
                    <Button
                      color="inherit"
                      size="small"
                      sx={location.pathname === "/bulkupload" ? liveLink : normalLink}
                      onClick={() => navigate("/bulkupload")}
                    >
                      Bulk Upload
                    </Button>
                  </>
                )}
                <Divider orientation="vertical" color="white" flexItem />
                <Button
                  color="inherit"
                  endIcon={<KeyboardDoubleArrowDown />}
                  onClick={handleClick}
                  sx={location.pathname.toLowerCase().includes("changepassword") ? liveLink : normalLink}
                >
                  {username}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{ "aria-labelledby": "settings-button" }}
                  sx={{ "& .MuiMenu-paper": { color: "white", backgroundColor: alpha("#0B0B0B", 0.9) } }}
                >
                  <MenuItem onClick={handleClickOpen} sx={{ color: "white" }}>
                    <ListItemIcon><Logout fontSize="small" sx={{ color: "white" }} /></ListItemIcon>
                    Logout
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/ChangePassword")} sx={{ color: "white" }}>
                    <ListItemIcon><Settings fontSize="small" sx={{ color: "white" }} /></ListItemIcon>
                    Change Password
                  </MenuItem>
                  {employeeType === "Admin" && (
                    <MenuItem onClick={() => navigate("/AddExtras")} sx={{ color: "white" }}>
                      <ListItemIcon><GroupAddOutlinedIcon fontSize="small" sx={{ color: "white" }} /></ListItemIcon>
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
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, color: "white", backgroundColor:"transparent" },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>

      {/* Logout Dialog */}
      <Dialog open={openpop} onClose={handleClosePop} sx={{ "& .MuiDialog-paper": { backgroundColor: "transparent", backdropFilter: "blur(100px)", color: "white" } }}>
        <DialogTitle sx={{ p: 2, textTransform: "uppercase", letterSpacing: 6 }}>Logout</DialogTitle>
        <DialogContent dividers>
          <IconButton aria-label="close" onClick={handleClosePop} sx={{ position: "absolute", right: 8, top: 8, color: "white" }}>
            <CloseIcon />
          </IconButton>
          <Typography gutterBottom sx={{ wordBreak: "break-word", fontWeight: "bold" }}>
            Hey {username}, confirm your Logout!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
          <Button variant="contained" onClick={handleClosePop}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openpopDrawer} onClose={handleClosePopDrawer} sx={{ "& .MuiDialog-paper": { backgroundColor: "transparent", backdropFilter: "blur(100px)", color: "white" } }}>
        <DialogTitle sx={{ m: 0, p: 2, textTransform: "uppercase", letterSpacing: 6 }}>Logout</DialogTitle>
        <DialogContent dividers>
          <IconButton aria-label="close" onClick={handleClosePopDrawer} sx={{ position: "absolute", right: 8, top: 8, color: "white" }}>
            <CloseIcon />
          </IconButton>
          {employeeType === "Admin" && <Typography gutterBottom sx={{ wordBreak: "break-word" }}>For Bulk-Upload & Add-Extras use Tab / Laptop.</Typography>}
          <Typography gutterBottom sx={{ wordBreak: "break-word", fontWeight: "bold" }}>
            Hey {username}, confirm your Logout!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
          <Button variant="contained" onClick={handleClosePopDrawer}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}