import * as React from "react";
import "../../App.css";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

export default function ProfileDashboard() {
  return (
    <>
      <div className="bg" style={{ paddingBottom: "30px" }}>
        <Grid container spacing={2} sx={{ padding: "1%", paddingTop: "15%" }}>
          <Grid item xs={6} md={3}>
            <div
              style={{
                height: "8vh",
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                borderRadius: "20px",
                borderLeftWidth: "2vh",
                textAlign: "center",
                textTransform: "uppercase",
                paddingTop: ".8%"
              }}
            >
              <Typography variant="h6" mt="3%" color="white">
                Button UI
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6} md={3}>
            <div
              style={{
                height: "8vh",
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                borderRadius: "20px",
                borderLeftWidth: "2vh",
                textAlign: "center",
                textTransform: "uppercase",                
                paddingTop: ".8%"
              }}
            >
              <Typography variant="h6" mt="3%" color="white">
                Button UI
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6} md={3}>
            <div
              style={{
                height: "8vh",
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                borderRadius: "20px",
                borderStyle: "solid",
                borderColor: "#FF5C00",
                borderWidth: "0.3vh",
                borderLeftWidth: "2vh",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              <Typography variant="h6" mt="3%" color="white">
                Button UI
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6} md={3}>
            <div
              style={{
                height: "8vh",
                backgroundColor: "transparent",
                backdropFilter: "blur(70px)",
                borderRadius: "20px",
                borderStyle: "solid",
                borderColor: "#FF5C00",
                borderWidth: "0.3vh",
                borderLeftWidth: "2vh",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              <Typography variant="h6" mt="3%" color="white">
                Button UI
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
                borderLeftColor: "#FFFF00",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                borderLeftColor: "#FFFF00",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                borderLeftColor: "#FFFF00",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                borderLeftColor: "#FFFF00",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                borderLeftColor: "#FFFF00",
                borderLeftWidth: "0.5vh",
              }}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
                  <Typography component="div" variant="h6">
                    Live From Space
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
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
