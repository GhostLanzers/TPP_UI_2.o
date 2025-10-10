import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.user);

  // Common card style (matches employeeDashboard.js)
  const cardsStyle = {
    minHeight: "9vh",
    maxHeight: "13vh",
    backgroundColor: "transparent",
    backdropFilter: "blur(70px)",
    color: "white",
    borderRadius: "16px",
    borderLeftStyle: "solid",
    borderLeftWidth: "0.4vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "1rem 1.2rem",
    boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
    transition: "all 0.4s ease",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-6px) scale(1.04)",
      boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
      background: "rgba(255, 255, 255, 0.1)",
      color: "#00FFEF",
      borderColor: "#FFF700",
      borderLeftWidth: "0.7vh",
      letterSpacing: "0.5vh",
      boxShadow: "0 0 20px rgba(0,255,239,0.4)",
    },
  };

  // Responsive layout spacing
  const screenWidth = window.innerWidth;
  const inlineStyles = {
    paddingTop: "10vh",
    paddingBottom: "2vh",
    ...(screenWidth <= 576 && { marginLeft: "5%", width: "90%" }),
    ...(screenWidth > 576 && { marginLeft: "10%", width: "80%" }),
  };

  return (
    <div style={inlineStyles}>
      {/* Page Header */}
      <Grid container>
        <Grid item sm={2} />
        <Grid item xs={12} sm={8}>
          <Typography
            variant="h5"
            align="center"
            sx={{
              color: "white",
              fontWeight: "light",
              fontSize: { sm: "3vh", md: "5vh" },
              letterSpacing: "0.5vh",
            }}
          >
            Welcome Back,&nbsp;
            <Box
              component="span"
              sx={{
                color: "#00FFEF",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.9vh",
              }}
            >
              {username}
            </Box>
            !
          </Typography>
        </Grid>
      </Grid>

      {/* Button Cards */}
      <Grid container columnSpacing={5} rowSpacing={3} sx={{ paddingTop: "5vh" }}>
        {[
          { title: "DAILY PERFORMANCE", color: "#FF00FF", path: "/dailygrid?employeeType=Recruiter" },
          { title: "MONTHLY PERFORMANCE", color: "#00FFFF", path: "/monthlygrid?employeeType=Recruiter" },
          { title: "BUSINESS PERFORMANCE", color: "#FF5C00", path: "/businessgrid" },
          { title: "PIE CHARTS", color: "#FF0000", path: "/underdevelopment" },
          { title: "ANALYSIS", color: "#00FF00", path: "/piechart?type=L1WD" },
          { title: "BULK UPLOADS", color:"#00FFFF", path: "/bulkupload"},
          { title: "ADD EXTRAS", color:"#FF00FF", path: "/AddExtras"},
          { title: "HOME", color:"#FF5C00", path: "/"},
        ].map((item, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Card
              sx={{
                ...cardsStyle,
                borderLeftColor: item.color,
              }}
              onClick={() => navigate(item.path)}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  align={item.full ? "center" : "left"}
                >
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
