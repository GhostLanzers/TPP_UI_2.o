import * as React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfileDashboard() {
  const navigate = useNavigate();

  // Data for Cards (COUNTS)
  const [counts, setCounts] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/candidate/values/counts",
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );

        setCounts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
                borderColor: "white",
                borderBlockWidth: "0.1vh",
              }}
              onClick={() => navigate("AddCandidate")}SearchProfile
            >
              <Typography
                variant="h6"
                mt="1.5%"
                color="white"
                fontWeight="bold"
              >
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
                borderColor: "white",
                borderBlockWidth: "0.1vh",
              }}
            >
              <Typography
                variant="h6"
                mt="1.5%"
                color="white"
                fontWeight="bold"
              >
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
                borderColor: "white",
                borderBlockWidth: "0.1vh",
              }}
            >
              <Typography
                variant="h6"
                mt="1.5%"
                color="white"
                fontWeight="bold"
              >
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
                borderColor: "white",
                borderBlockWidth: "0.1vh",
              }}
              onClick={() => navigate("searchprofile")}
            >
              <Typography
                variant="h6"
                mt="1.5%"
                color="white"
                fontWeight="bold"
              >
                SEARCH PROFILE
              </Typography>
            </div>
          </Grid>
        </Grid>
        {/* Lower Grid Data Cards */}
        <Grid
          container
          columnSpacing={2.5}
          rowSpacing={1}
          sx={{ padding: "1%", paddingTop: "0%" }}
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
              onClick={() => navigate("/CandidateGrid?type=all")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    All Candidates
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["all"] ? counts["all"] : 0}
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
              onClick={() => navigate("/CandidateGrid?type=newCandidates")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    New Candidate
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["newCandidates"]
                      ? counts["newCandidates"]
                      : 0}
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
              onClick={() => navigate("/CandidateGrid?type=L1L2WrongNumbers")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    L1 & L2 Wrong Numbers
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["L1L2WrongNumbers"]
                      ? counts["L1L2WrongNumbers"]
                      : 0}
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
              onClick={() => navigate("/CandidateGrid?type=L1L2Blacklist")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    L1 & L2 Blacklist
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["L1L2Blacklist"]
                      ? counts["L1L2Blacklist"]
                      : 0}
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
              onClick={() => navigate("/CandidateGrid?type=NonLeads")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Non Leads
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["NonLeads"] ? counts["NonLeads"] : 0}
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
              onClick={() => navigate("/CandidateGrid?type=L1WD")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    L1 WD
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["L1WD"] ? counts["L1WD"] : 0}
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
              onClick={() => navigate("/CandidateGrid?type=L2WD")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    L2 WD
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["L2WD"] ? counts["L2WD"] : 0}
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
              onClick={() => navigate("/CandidateGrid?type=NSWI")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    No Show Walk-In
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["NSWI"] ? counts["NSWI"] : 0}
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
              onClick={() => navigate("/CandidateGrid?type=NSIC")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    No Show IC
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["NSIC"] ? counts["NSIC"] : 0}
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
              onClick={() => navigate("/CandidateGrid?type=Awaiting")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    L2 Awaiting
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["Awaiting"] ? counts["Awaiting"] : 0}
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
              onClick={() => navigate("/CandidateGrid?type=L2DND")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    L2 DND
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["L2DND"] ? counts["L2DND"] : 0}
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
              onClick={() => navigate("/CandidateGrid?type=InterviewScheduled")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Interview Scheduled
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["InterviewScheduled"]
                      ? counts["InterviewScheduled"]
                      : 0}
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
              onClick={() => navigate("/CandidateGrid?type=VirtualInterview")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Virtual Interview
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["VirtualInterview"]
                      ? counts["VirtualInterview"]
                      : 0}
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
              onClick={() => navigate("/CandidateGrid?type=Rejects")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Rejects
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["Rejects"] ? counts["Rejects"] : 0}
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
              onClick={() => navigate("/CandidateGrid?type=OfferDrop")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Offer Drop
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["OfferDrop"] ? counts["OfferDrop"] : 0}
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
              onClick={() => navigate("/CandidateGrid?type=AwaitingJoining")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Awaiting Joining
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["AwaitingJoining"]
                      ? counts["AwaitingJoining"]
                      : 0}
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
              onClick={() => navigate("/CandidateGrid?type=Hold")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Hold
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["Hold"] ? counts["Hold"] : 0}
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
              onClick={() => navigate("/CandidateGrid?type=TrackingTenure")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Tracking Tenure
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["TrackingTenure"]
                      ? counts["TrackingTenure"]
                      : 0}
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
              onClick={() => navigate("/CandidateGrid?type=Billed")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Billed
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["Billed"] ? counts["Billed"] : 0}
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
              onClick={() => navigate("/CandidateGrid?type=N2B")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    N2B
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["N2B"] ? counts["N2B"] : 0}
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
              onClick={() => navigate("/CandidateGrid?type=NonTenure")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Non Tenure
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["NonTenure"] ? counts["NonTenure"] : 0}
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
              onClick={() => navigate("/CandidateGrid?type=ProcessRampdown")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Process Rampdown
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["ProcessRampdown"]
                      ? counts["ProcessRampdown"]
                      : 0}
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
              onClick={() => navigate("/CandidateGrid?type=ClientRampdown")}
            >
              <Box>
                <CardContent sx={{ flex: "1 0 auto", maxHeight: "5vh" }}>
                  <Typography component="div" variant="h7" fontWeight="bold">
                    Client Rampdown
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {counts && counts["ClientRampdown"]
                      ? counts["ClientRampdown"]
                      : 0}
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
