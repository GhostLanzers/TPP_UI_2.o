import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  DialogActions,
  IconButton,
  DialogTitle,
  Dialog,
  DialogContent,
  BottomNavigation,
  Container,
  TextField,
  Chip,
  Autocomplete,
  Button,
  Grid,
  Alert,
  alpha,
} from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import dayjs from "dayjs";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ExcelExport from "../Main/ExcelExport";
import { flatten } from "flat";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";

export default function AssignCandidateGrid(props) {
  // STATES HANDLING AND VARIABLES
  const [open, setOpen] = React.React.useState(false);
  const { employeeType, userid } = useSelector((state) => state.user);
  const gridapi = React.useRef();
  const location = useLocation();
  const [count, setCount] = React.useState(0);
  const [potentialLeadList, setPotentialLeadList] = React.useState([]);
  const [employeeList, setEmployeeList] = React.useState([]);
  const [fileName, setFileName] = React.useState(String(new Date()));
  const [assignees, setAssignees] = React.useState([]);
  const [warning, setWarning] = React.useState("");
  const [deleteData, setDeleteData] = React.useState({});
  const isAdmin = employeeType === "Admin";
  const navigate = useNavigate();
  const rtAccess = ["Recruiter", "Intern"].includes(employeeType);
  const empId = userid;
  const [tableData, setTableData] = React.useState([]);

  // API CALLS HANDLING
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const candidates = await axios.post(
          "https://tpp-backend-eura.onrender.com/api/v1/candidate/candidate/assignSearch",
          { query: { ...location.state.query } },
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );
        const empres = await axios.get(
          "https://tpp-backend-eura.onrender.com/api/v1/employee",
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );
        setEmployeeList(empres.data.employees);
        setPotentialLeadList(candidates.data.candidates);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // GRID HEADER/COLOUMS HANDLING
  const column = [
    {
      headerName: "Created By",
      field: "createdByEmployee.name",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
    },
    { headerName: "Assigned to", field: "assignedEmployee.name" },
    { headerName: "Candidate Name", field: "fullName" },
    { headerName: "Candidate ID", field: "candidateId" },
    { headerName: "Candidate Number", field: "mobile", sortable: false },
    { headerName: "Candidate Email ID", field: "email" },
    { headerName: "L1 Assessment", field: "l1Assessment" },
    { headerName: "L2 Assessment", field: "l2Assessment" },
    { headerName: "Company", field: "companyId.companyName" },
    { headerName: "Role", field: "roleId.role" },
    {
      headerName: "Interview Date",
      field: "interviewDate",
      valueFormatter: (p) =>
        p.value ? dayjs(p.value).format("DD/MM/YYYY") : p.value,
    },
    { headerName: "Interview Status", field: "interviewStatus" },
    { headerName: "Remarks", field: "remarks" },
    { headerName: "Tenure Status", field: "select" },
    {
      headerName: "Onboarding Date",
      field: "onboardingDate",
      valueFormatter: (p) =>
        p.value ? dayjs(p.value).format("DD/MM/YYYY") : p.value,
    },
    {
      headerName: "Next Tracking Date",
      field: "nextTrackingDate",
      valueFormatter: (p) =>
        p.value ? dayjs(p.value).format("DD/MM/YYYY") : p.value,
    },
    { headerName: "Rate", field: "rate", hide: !isAdmin },
    {
      headerName: "Billing Date",
      field: "billingDate",
      valueFormatter: (p) =>
        p.value ? dayjs(p.value).format("DD/MM/YYYY") : p.value,
    },
    {
      headerName: "Invoice Date",
      field: "invoiceDate",
      valueFormatter: (p) =>
        p.value ? dayjs(p.value).format("DD/MM/YYYY") : p.value,
    },
    {
      headerName: "Invoice Number",
      field: "invoiceNumber",
    },
    {
      headerName: "Actions",
      width: isAdmin ? "180px" : "150px",
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
            <Grid container columnSpacing={0}>
              <Grid item xs={isAdmin ? 4 : 6}>
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() =>
                    navigate(`/EditCandidate/${props.data._id}?edit=false`)
                  }
                >
                  <VisibilityTwoToneIcon />
                </IconButton>
              </Grid>
              <Grid item xs={isAdmin ? 4 : 6}>
                <a href={`/EditCandidate/${props.data._id}?edit=true`}>
                  <IconButton
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
                    <BorderColorTwoToneIcon />
                  </IconButton>
                </a>
              </Grid>
              {isAdmin && (
                <Grid item xs={4}>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => {
                      setDeleteData({
                        name: props.data.fullName,
                        id: props.data.candidateId,
                        _id: props.data._id,
                      });
                      handleClickOpen();
                    }}
                  >
                    <DeleteSweepTwoToneIcon />
                  </IconButton>
                </Grid>
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
    rowSelection: "multiple",
  };
  const selection = React.useMemo(() => {
    return {
      mode: "multiRow",
      groupSelects: "descendants",
    };
  }, []);
  const paginationPageSizeSelector = React.useMemo(() => {
    return [200, 500, 1000];
  }, []);

  // FUNCTIONS HANDLING AND POST CALLS
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      axios.delete("https://tpp-backend-eura.onrender.com/api/v1/candidate/" + id, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("user")).token,
        },
      });
      setTableData(tableData.filter((d) => d._id !== id));
      handleClose();
    } catch (error) {}
  };

  const handleAssign = async () => {
    var selectedRows = gridapi.current.api.getSelectedRows();
    var emp = assignees;
    var srCount = selectedRows.length;
    var empCount = assignees.length;
    if (srCount === 0) {
      setWarning("Select Rows to continue");
      return;
    } else if (empCount === 0) {
      setWarning("Select Empoloyees to Assign");
      return;
    }
    var ind = 0;
    var i = 0;
    var count = parseInt(srCount / empCount);
    console.log(count);
    var assignedData = [];
    while (srCount / count > 0) {
      const part = selectedRows.slice(ind, count + ind);
      if (i === empCount)
        assignedData[i - 1].part = assignedData[i - 1].part.concat(part);
      else assignedData.push({ emp: emp[i], part: part.map((o) => o._id) });
      i += 1;
      srCount -= count;
      ind += count;
    }
    try {
      await axios.post(
        "https://tpp-backend-eura.onrender.com/api/v1/candidate/candidate/assign",
        {
          list: assignedData,
        },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      setTimeout(
        () =>
          setPotentialLeadList(
            potentialLeadList.filter((lead) => {
              return !selectedRows.map((row) => row._id).includes(lead._id);
            })
          ),
        setWarning("")
      );
    } catch (error) {}
  };

  //JSX CODE
  return (
    <>
      <Container
        sx={{ paddingTop: "9vh", width: "100%", paddingBottom: "2vh" }}
      >
        <Card
          sx={{
            borderRadius: "20px",
            backgroundColor: "transparent",
          }}
        >
          <CardHeader
            sx={{
              backgroundColor: alpha("#0B0B0B", 0.5),
              backdropFilter: "blur(5px)",
              height: "7.5vh",
              color: "white",
            }}
            title="CANDIDATES DATA"
            titleTypographyProps={{
              sx: {
                fontSize: "2.8vh",
                letterSpacing: "5px",
              },
            }}
          />
          <CardContent sx={{ backgroundColor: alpha("#FFFFFF", 0.7) }}>
            <Grid
              container
              columnSpacing={1}
              rowSpacing={1}
              sx={{ paddingBottom: "2vh" }}
            >
              <Grid item xs={8}>
                <Autocomplete
                  multiple
                  id="Employees"
                  options={employeeList}
                  filterSelectedOptions
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, item) => (
                    <li {...props} key={item.key}>
                      {item.name}
                    </li>
                  )}
                  onChange={(e, newValue) =>
                    setAssignees(newValue.map((option) => option._id))
                  }
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      const { key, ...tagProps } = getTagProps({ index });
                      return (
                        <Chip
                          variant="outlined"
                          label={option.name}
                          key={key}
                          {...tagProps}
                        />
                      );
                    })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select Recruiter to Assign" />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  sx={{
                    backgroundColor: alpha("#0000FF", 0.5),
                    height: "100%",
                  }}
                  onClick={handleAssign}
                >
                  ASSIGN
                </Button>
              </Grid>
              <Grid item xs={8} sm={2} md={1.5}>
                <TextField
                  fullWidth
                  type="number"
                  label="No.of Rows"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={4} sm={3} md={2}>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  sx={{
                    backgroundColor: alpha("#0000FF", 0.5),
                    height: "100%",
                  }}
                  onClick={() => {
                    if (potentialLeadList.length === 0) {
                      setWarning("No Rows to select");
                      return;
                    }
                    for (var i = 0; i < count; i++) {
                      var node = gridapi.current.api.getRowNode(i);
                      node.setSelected(true);
                    }
                  }}
                >
                  Select
                </Button>
              </Grid>
              <Grid item md={2} display={{ xs: "none", md: "block" }} />
              <Grid item xs={7.5} sm={4.5}>
                <TextField
                  fullWidth
                  label="File Name"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </Grid>
              <Grid item xs={4.5} sm={2.5} md={2}>
                <ExcelExport
                  excelData={potentialLeadList.map((l) => flatten(l))}
                  fileName={fileName}
                />
              </Grid>
              <Grid item xs={12}>
                {warning && (
                  <Alert
                    severity="error"
                    onClose={() => {
                      setWarning("");
                    }}
                  >
                    {warning}
                  </Alert>
                )}
              </Grid>
            </Grid>
            <div className="ag-theme-quartz-dark">
              <AgGridReact
                ref={gridapi}
                domLayout="autoHeight"
                rowData={potentialLeadList}
                columnDefs={column}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={100}
                overlayLoadingTemplate={
                  '<div class="ag-overlay-loading-center"><div class="spinner"></div></div>'
                }
                selection={selection}
                paginationPageSizeSelector={paginationPageSizeSelector}
                rowSelection={"multiple"}
                isRowSelectable={() => true}
              />
            </div>
          </CardContent>
          <BottomNavigation
            sx={{
              backgroundColor: alpha("#0B0B0B", 0.5),
              backdropFilter: "blur(5px)",
              height: "7vh",
            }}
          />
        </Card>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
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
        <DialogContent dividers className="dw">
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
          <Typography sx={{ fontWeight: "bold", display: "inline" }}>
            Candidate ID :
          </Typography>
          <Typography sx={{ display: "inline" }}> {deleteData.id}</Typography>
          <Typography></Typography>
          <Typography sx={{ fontWeight: "bold", display: "inline" }}>
            Candidate Name :
          </Typography>
          <Typography sx={{ display: "inline" }}> {deleteData.name}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="large"
            color="error"
            sx={{ backgroundColor: alpha("#FF0000", 0.4) }}
            onClick={() => {
              handleDelete(deleteData._id);
            }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{ backgroundColor: alpha("#0000FF", 0.5) }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
