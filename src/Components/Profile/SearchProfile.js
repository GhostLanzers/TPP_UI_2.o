import * as React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  Container,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Button,
  Grid,
  BottomNavigation,
  alpha,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SearchProfile(props) {

  const { employeeType, userid } = useSelector((state) => state.user);
  const rtAccess = ["Recruiter", "Intern"].includes(employeeType);
  const empId = userid;
  const isTeamlead = employeeType === "Teamlead";
  const isAdmin = employeeType === "Admin";
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = React.useState({
    name: "",
    mobile: "",
    email: "",
  });
  const [tableData, setTableData] = React.useState([]);
  const handleSearch = async () => {
    if (searchParams.name==="" && searchParams.mobile==="" && searchParams.email==="") {
        toast.warning("Fuckup")
        return
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/candidate/search",
        { ...searchParams },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      setTableData(res.data);
    } catch (error) {}
  };
  const column = [
    { headerName: "Candidate Name", field: "fullName" },
    { headerName: "Candidate ID", field: "candidateId" },
    { headerName: "Candidate Number", field: "mobile", sortable: false },
    { headerName: "Candidate Status", field: "status" },
    {
      headerName: "Actions",
      width: isAdmin ? "350px" : "250px",
      field: "assignedEmployee",

      comparator: (a, b) => {
        if (a === empId && b !== empId) return -1;
        else if (b === empId && a !== empId) return 1;
        else if (a === undefined || a === null) return 1;
        else if (b === undefined || b === null) return -1;
        else return 0;
      },
      cellRenderer: (props) => {
        return (
          <>
            <Grid container columnSpacing={1}>
              <Grid item xs={isAdmin ? 4 : 6}>
                <Button
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    navigate(`/EditCandidate/${props.data._id}?edit=false`)
                  }
                >
                  View
                </Button>
              </Grid>
              <Grid item xs={isAdmin ? 4 : 6}>
                <Button
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  color="secondary"
                  onClick={() =>
                    navigate(`/EditCandidate/${props.data._id}?edit=true`)
                  }
                  disabled={
                    !rtAccess
                      ? false
                      : props.data.assignedEmployee === empId
                      ? false
                      : true
                  }
                >
                  Edit
                </Button>
              </Grid>
              {isAdmin && (
                <>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      size="small"
                      color="error"
                      href="#contained-buttons"
                    >
                      Delete
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </>
        );
      },
    },
  ];

  const defaultColDef = {
    sortable: true,
    editable: false,
    cellEditor: false,
    filter: true,
  };
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ paddingTop: "9.5vh", width: "96%" }}>
        <Card
          sx={{
            borderRadius: "20px",
              backgroundColor: "transparent",
          }}
        >
          <CardHeader
            sx={{
                backgroundColor: alpha("#0B0B0B", 0.5),
                backdropFilter: "blur(60px)",
                color: "white",
              }}
            title="SEARCH PROFILE"
          />
          <CardContent sx={{ backgroundColor: alpha("#FFFFFF", 0.6) }}>
            <Grid container rowSpacing={2} columnSpacing={1}>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={searchParams.name}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  type="number"
                  label="Mobile Number"
                  variant="outlined"
                  fullWidth
                  value={searchParams.mobile}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, mobile: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label="Email ID"
                  variant="outlined"
                  fullWidth
                  value={searchParams.email}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={9} />
              <Grid item xs={3}>
                <Button
                  fullWidth
                  size="large"
                  sx={{ backgroundColor: alpha("#0000FF", 0.5) }}
                  variant="contained"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <BottomNavigation
            sx={{
                backgroundColor: alpha("#0B0B0B", 0.5),
                backdropFilter: "blur(60px)",
            }}
            elevation={3}
          />
        </Card>
      </Container>
      <Container disableGutters maxWidth={false} sx={{ paddingTop: "2vh", width: "96%", paddingBottom: "1.5vh" }}>
        <Card
          sx={{
            borderRadius: "20px",
            backgroundColor: "transparent",
          }}
        >
          <CardHeader
            sx={{
                backgroundColor: alpha("#0B0B0B", 0.5),
                backdropFilter: "blur(60px)",
                color: "white",
              }}
            title="SEARCH RESULTS"
          />
          <CardContent sx={{ backgroundColor: alpha("#FFFFFF", 0.3) }}>
            <Grid container xs={12}>
              <div
                className="ag-theme-quartz-dark"
                style={{
                  height: "100%",
                  width: "99%",
                  marginLeft: "0.5%",
                }}
              >
                <AgGridReact
                  domLayout="autoHeight"
                  rowData={tableData}
                  columnDefs={column}
                  defaultColDef={defaultColDef}
                  pagination={true}
                  paginationPageSize={10}
                  paginationPageSizeSelector={() => [10, 20, 50, 100, 200, 500]}
                />
              </div>
            </Grid>
          </CardContent>
          <BottomNavigation
            sx={{
                backgroundColor: alpha("#FFFFFF", 0.15),
                backdropFilter: "blur(60px)"
              }}
          />
        </Card>
      </Container>
    </>
  );
}