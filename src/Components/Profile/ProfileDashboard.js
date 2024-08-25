import * as React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProfileDashboard() {

  const navigate = useNavigate();

  return (
    <>
      <div>
        <Grid container spacing={2} sx={{ padding: "1%", paddingTop: "9.5vh" }}>
          <Grid item xs={6} md={3}>
            <div
              style={{
                height: "7vh",
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                borderRadius: "20px",
                textAlign: "center",
                paddingTop: ".8%",
                borderBlockStyle: "solid",
                borderColor:"white",
                borderBlockWidth:"0.1vh",              
              }}
              onClick={() => navigate("AddCandidate")}
            >
              <Typography variant="h6" mt="1.5%" color="white" fontWeight= "bold">
                ADD CANDIDATE
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6} md={3}>
            <div
              style={{
                height: "7vh",
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                borderRadius: "20px",
                textAlign: "center",
                paddingTop: ".8%",
                borderBlockStyle: "solid",
                borderColor:"white",
                borderBlockWidth:"0.1vh",
              }}
            >
              <Typography variant="h6" mt="1.5%" color="white" fontWeight= "bold">
                ASSIGN PROFILE
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6} md={3}>
            <div
              style={{
                height: "7vh",
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                borderRadius: "20px",
                textAlign: "center",
                paddingTop: ".8%",
                borderBlockStyle: "solid",
                borderColor:"white",
                borderBlockWidth:"0.1vh",
              }}
            >
              <Typography variant="h6" mt="1.5%" color="white" fontWeight= "bold">
                POTENTIAL LEADS
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6} md={3}>
            <div
              style={{
                height: "7vh",
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                borderRadius: "20px",
                textAlign: "center",
                paddingTop: ".8%",
                borderBlockStyle: "solid",
                borderColor:"white",
                borderBlockWidth:"0.1vh",
              }}
            >
              <Typography variant="h6" mt="1.5%" color="white" fontWeight= "bold">
                SEARCH PROFILE
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          columnSpacing={2.5}
          rowSpacing={1}
          sx={{ padding: "1%" }}
        >
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#FF5C00",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    83
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#FF0000",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    888888
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#00FF00",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    8888884
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#00FFFF",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    9,88,88,887
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#FF00FF",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    88888844
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#FF5C00",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    8
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#FF0000",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    888888
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#00FF00",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    8888884
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#00FFFF",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    9,88,88,887
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#FF00FF",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    88888844
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#FF5C00",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    8
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#FF0000",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    888888
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#00FF00",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    8888884
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#00FFFF",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    9,88,88,887
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#FF00FF",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    88888844
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#FF5C00",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    8
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#FF0000",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    888888
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#00FF00",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    8888884
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#00FFFF",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    9,88,88,887
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#FF00FF",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    88888844
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#FF5C00",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    8
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#FF0000",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    888888
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={12 / 5}>
            <Card
              sx={{
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                color: "white",
                borderRadius: "20px",
                borderLeftStyle: "solid",
                borderLeftColor: "#00FF00",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    8888884
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
