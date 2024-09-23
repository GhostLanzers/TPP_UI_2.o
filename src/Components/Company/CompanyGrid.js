import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { toast } from "react-toastify";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  Button,
  Grid,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Typography,
  IconButton,
  TextField,
  alpha,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import ExcelExport from "../../Components/Main/ExcelExport";
import { flatten } from "flat";

export default function CompanyGrid(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { employeeType } = useSelector((state) => state.user);
  const [tableData, setTableData] = useState([]);
  const access = !["Recruiter", "Teamlead", "Intern"].includes(employeeType);
  const [deleteData, setDeleteData] = useState({});
  const [searchParams] = useSearchParams();
  const gridapi = React.useRef();
  const [fileName, setFileName] = useState(String(new Date()));
  const [warning, setWarning] = useState("");
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    var url =
      "http://localhost:5000/api/v1/company/companyType/?companyType=" +
      searchParams.get("companyType");
    if (!searchParams.has("companyType")) {
      url = "http://localhost:5000/api/v1/company/companyType";
    }
    axios
      .get(url, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("user")).token,
        },
      })
      .then((res) => setTableData(res.data))
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  }, []);

  // NEW BUTTON COLOURS THEME
  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = (mainColor) =>
    augmentColor({ color: { main: mainColor } });
  const theme = createTheme({
    palette: {
      white: createColor("#FFFFF0"),
      anger: createColor("#F40B27"),
      apple: createColor("#5DBA40"),
      steelBlue: createColor("#5C76B7"),
      violet: createColor("#BC00A3"),
    },
  });

  const column = [
    {
      headerName: "Company Name",
      field: "companyName",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
    },
    { headerName: "HR Name", field: "HRName", hide: !access },
    { headerName: "HR Mobile", field: "HRMobile", hide: !access },
    { headerName: "HR Email", field: "HREmail", hide: !access },
    { headerName: "Remarks", field: "remarks", hide: !access },

    {
      headerName: "Status",
      width: "100px",
      cellRenderer: (props) => {
        return (
          <>
            {props.data.empanelled ? (
              <>
                <IconButton color="success">
                  <CheckCircleTwoToneIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton color="error">
                  <CancelTwoToneIcon />
                </IconButton>
              </>
            )}
          </>
        );
      },
    },

    {
      headerName: "In Process",
      suppressSizeToFit: true,
      width: "120px",
      cellRenderer: (props) => {
        return (
          <>
            <ThemeProvider theme={theme}>
              <Grid item xs={12}>
                <Button
                  color="white"
                  size="small"
                  onClick={() =>
                    navigate(
                      "/CandidateGrid?type=CompanyInterviewScheduled&&companyId=" +
                        props.data._id
                    )
                  }
                >
                  {props.data.inProcess}
                </Button>
              </Grid>
            </ThemeProvider>
          </>
        );
      },
    },
    {
      headerName: "Rejected",
      width: "115px",
      cellRenderer: (props) => {
        return (
          <>
            <ThemeProvider theme={theme}>
              <Grid item xs={12}>
                <Button
                  color="white"
                  size="small"
                  onClick={() =>
                    navigate(
                      "/CandidateGrid?type=Rejects&&companyId=" + props.data._id
                    )
                  }
                >
                  {props.data.rejected}
                </Button>
              </Grid>
            </ThemeProvider>
          </>
        );
      },
    },
    {
      headerName: "Awaiting Joining",
      width: "120px",
      cellRenderer: (props) => {
        return (
          <>
            <ThemeProvider theme={theme}>
              <Grid item xs={12}>
                <Button
                  color="white"
                  size="small"
                  onClick={() =>
                    navigate(
                      "/CandidateGrid?type=AwaitingJoining&&companyId=" +
                        props.data._id
                    )
                  }
                >
                  {props.data.awaiting}
                </Button>
              </Grid>
            </ThemeProvider>
          </>
        );
      },
    },
    {
      headerName: "Offer Drop",
      width: "120px",
      cellRenderer: (props) => {
        return (
          <>
            <ThemeProvider theme={theme}>
              <Grid item xs={12}>
                <Button
                  color="white"
                  size="small"
                  onClick={() =>
                    navigate(
                      "/CandidateGrid?type=OfferDrop&&companyId=" +
                        props.data._id
                    )
                  }
                >
                  {props.data.offerDrop}
                </Button>
              </Grid>
            </ThemeProvider>
          </>
        );
      },
    },
    {
      headerName: "Joined",
      width: "100px",
      cellRenderer: (props) => {
        return (
          <>
            <ThemeProvider theme={theme}>
              <Grid item xs={12}>
                <Button
                  color="white"
                  size="small"
                  onClick={() =>
                    navigate(
                      "/CandidateGrid?type=joined&&companyId=" + props.data._id
                    )
                  }
                >
                  {props.data.joined}
                </Button>
              </Grid>
            </ThemeProvider>
          </>
        );
      },
    },
    {
      headerName: "Actions",
      width: !access ? "200px" : "200px",
      cellRenderer: (props) => {
        return (
          <>
            <Grid container columnSpacing={1}>
              <Grid item xs={access ? 4 : 12}>
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() =>
                    navigate(`/EditEmpanelled/${props.data._id}?edit=false`)
                  }
                >
                  <VisibilityTwoToneIcon />
                </IconButton>
              </Grid>
              {access && (
                <>
                  <Grid item xs={4}>
                    <IconButton
                      size="small"
                      color="secondary"
                      onClick={() =>
                        navigate(`/EditEmpanelled/${props.data._id}?edit=true`)
                      }
                    >
                      <BorderColorTwoToneIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={4}>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => {
                        setDeleteData({
                          name: props.data.companyName,
                          id: props.data.companyId,
                          _id: props.data._id,
                        });
                        handleClickOpen();
                      }}
                    >
                      <DeleteSweepTwoToneIcon />
                    </IconButton>
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
    rowSelection: "multiple",
  };
  const getSelectedData = useCallback(() => {
    return gridapi.current?.api.getSelectedRows().map((l) => flatten(l));
  });
  const handleDelete = async (id) => {
    try {
      const company = axios.delete(
        "http://localhost:5000/api/v1/company/" + id,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      setTableData(tableData.filter((d) => d._id !== id));
      handleClose();
    } catch (error) {}
  };
  return (
    <>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Grid
          container
          spacing={2}
          sx={{ paddingTop: "9vh", marginLeft: "0.5%", width: "98%" }}
        >
          <Grid item xs={2} md={1}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="No.of Rows"
              value={count}
              className="tw"
              onChange={(e) => setCount(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              variant="contained"
              sx={{ height: "100%", backgroundColor: alpha("#0000FF", 0.4) }}
              onClick={() => {
                if (tableData.length === 0) {
                  toast.error("No Rows to select");
                  return;
                }
                for (var i = 0; i < Math.min(count, tableData.length); i++) {
                  var node = gridapi?.current.api.getRowNode(i);
                  node.setSelected(true);
                }
              }}
            >
              Select
            </Button>
          </Grid>
          <Grid item xs={0.5} md={4} />
          <Grid item xs={4} md={3}>
            <TextField
              size="small"
              label="File Name"
              value={fileName}
              fullWidth
              className="tw"
              onChange={(e) => setFileName(e.target.value)}
            />
          </Grid>
          <Grid item xs={3.5} md={2}>
            <ExcelExport
              height="100%"
              gridRef={gridapi}
              fileName={fileName}
            ></ExcelExport>
          </Grid>
        </Grid>
        <div
          className="ag-theme-quartz-dark"
          style={{
            marginTop: "2vh",
            marginLeft: "1vw",
            height: "82vh",
            width: "98vw",
          }}
        >
          <AgGridReact
            ref={gridapi}
            rowData={tableData}
            columnDefs={column}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={() => [10, 20, 50, 100, 200, 500]}
            rowSelection={"multiple"}
          />
        </div>
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
            <Typography sx={{ display: "inline" }}>
              {" "}
              {deleteData.name}
            </Typography>
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
      </div>
    </>
  );
}
