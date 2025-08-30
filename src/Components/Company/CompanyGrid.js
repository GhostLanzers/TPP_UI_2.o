import React, { useState, useMemo, useRef } from "react";
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
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import ExcelExport from "../../Components/Main/ExcelExport";
import AxiosInstance from "../Main/AxiosInstance";

export default function CompanyGrid() {
   // STATES HANDLING AND VARIABLES
   const [open, setOpen] = useState(false);
   const { employeeType } = useSelector((state) => state.user);
   const [tableData, setTableData] = useState([]);
   const access = !["Recruiter", "Teamlead", "Intern"].includes(employeeType);
   const [deleteData, setDeleteData] = useState({});
   const [searchParams] = useSearchParams();
   const gridapi = useRef();
   const [fileName, setFileName] = useState(String(new Date()));
   const [count, setCount] = useState(0);
   const navigate = useNavigate();

   // Build URL with URLSearchParams
   const type = searchParams.get("companyType") || "";
   const paramsObj = {};
   if (searchParams.has("companyType")) {
      paramsObj.companyType = searchParams.get("companyType");
   }
   const urlParams = new URLSearchParams(paramsObj).toString();
   const baseUrl = `/company/companyType${urlParams ? "?" + urlParams : ""}`;

   // AG Grid Infinite Row Model datasource
   const datasource = {
      getRows: (params) => {
         const { startRow, endRow } = params;
         const limit = endRow - startRow;
         const page = Math.floor(startRow / limit) + 1;

         AxiosInstance.get(baseUrl, {
            params: {
               page: page,
               limit: limit,
            },
         })
            .then((response) => {
               const data = response.data;
               setTableData(data.companies || []); // Keep local state for export functionality
               params.successCallback(data.companies, data.total);
            })
            .catch((error) => {
               toast.error("Failed to fetch company data");
               params.failCallback();
            });
      },
   };

   const onGridReady = (params) => {
      params.api.setDatasource(datasource);
   };

   // NEW BUTTON COLOURS THEME
   const { palette } = createTheme();
   const { augmentColor } = palette;
   const createColor = (mainColor) =>
      augmentColor({ color: { main: mainColor } });
   const theme = createTheme({
      palette: {
         white: createColor("#FFFFF0"),
      },
   });

   // GRID HEADER/COLOUMS HANDLING
   const column = [
      {
         headerName: "Actions",
         width: !access ? "200px" : "200px",
         cellRenderer: (props) => {
            if (!props.data) return null;
            return (
               <Grid container columnSpacing={1}>
                  <Grid item xs={access ? 4 : 12}>
                     <IconButton
                        color="primary"
                        size="small"
                        href={`/EditEmpanelled/${props.data._id}?edit=false`}
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
                              href={`/EditEmpanelled/${props.data._id}?edit=true`}
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
            );
         },
      },
      {
         headerName: "Company Name",
         field: "companyName",
         headerCheckboxSelection: true,
         checkboxSelection: true,
         headerCheckboxSelectionFilteredOnly: true,
      },
      {
         headerName: "HR Name",
         field: "HR.HRName",
         hide: !access,
         valueGetter: (params) => params.data?.HR?.map((hr) => hr.HRName).join(", "),
      },
      {
         headerName: "HR Mobile",
         field: "HR.HRMobile",
         hide: !access,
         valueGetter: (params) => params.data?.HR?.map((hr) => hr.HRMobile).flat().join(", "),
         filter: true,
      },
      {
         headerName: "HR Email",
         field: "HR.HREmail",
         hide: !access,
         valueGetter: (params) => params.data?.HR?.map((hr) => hr.HREmail).join(", "),
      },
      { headerName: "Remarks", field: "remarks", hide: !access },

      {
         headerName: "Status",
         width: "100px",
         cellRenderer: (props) => {
            if (!props.data) return null;
            return (
               <>
                  {props.data.empanelled ? (
                     <IconButton color="success">
                        <CheckCircleTwoToneIcon />
                     </IconButton>
                  ) : (
                     <IconButton color="error">
                        <CancelTwoToneIcon />
                     </IconButton>
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
            if (!props.data) return null;
            return (
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
                        {props.data.inProcess || 0}
                     </Button>
                  </Grid>
               </ThemeProvider>
            );
         },
      },
      {
         headerName: "Rejected",
         width: "115px",
         cellRenderer: (props) => {
            if (!props.data) return null;
            return (
               <ThemeProvider theme={theme}>
                  <Grid item xs={12}>
                     <Button
                        color="white"
                        size="small"
                        onClick={() =>
                           navigate(
                              "/CandidateGrid?type=Rejects&&companyId=" +
                                 props.data._id
                           )
                        }
                     >
                        {props.data.rejected || 0}
                     </Button>
                  </Grid>
               </ThemeProvider>
            );
         },
      },
      {
         headerName: "Awaiting Joining",
         width: "120px",
         cellRenderer: (props) => {
            if (!props.data) return null;
            return (
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
                        {props.data.awaiting || 0}
                     </Button>
                  </Grid>
               </ThemeProvider>
            );
         },
      },
      {
         headerName: "Offer Drop",
         width: "120px",
         cellRenderer: (props) => {
            if (!props.data) return null;
            return (
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
                        {props.data.offerDrop || 0}
                     </Button>
                  </Grid>
               </ThemeProvider>
            );
         },
      },
      {
         headerName: "Joined",
         width: "100px",
         cellRenderer: (props) => {
            if (!props.data) return null;
            return (
               <ThemeProvider theme={theme}>
                  <Grid item xs={12}>
                     <Button
                        color="white"
                        size="small"
                        onClick={() =>
                           navigate(
                              "/CandidateGrid?type=joined&&companyId=" +
                                 props.data._id
                           )
                        }
                     >
                        {props.data.joined || 0}
                     </Button>
                  </Grid>
               </ThemeProvider>
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

   const selection = useMemo(() => ({
      mode: "multiRow",
      groupSelects: "descendants",
   }), []);

   const paginationPageSizeSelector = useMemo(() => [200, 500, 1000], []);

   // FUNCTIONS HANDLING
   const handleClickOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const handleDelete = async (id) => {
      try {
         await AxiosInstance.delete("/company/" + id);
         // Refresh the grid after deletion
         gridapi.current?.api?.refreshInfiniteCache();
         handleClose();
         toast.success("Company deleted successfully");
      } catch (error) {
         toast.error("Failed to delete company");
      }
   };

   //JSX CODE
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
                     sx={{
                        height: "100%",
                        backgroundColor: alpha("#0000FF", 0.4),
                     }}
                     onClick={() => {
                        if (tableData.length === 0) {
                           toast.error("No Rows to select");
                           return;
                        }
                        for (
                           let i = 0;
                           i < Math.min(count, tableData.length);
                           i++
                        ) {
                           const node = gridapi?.current?.api?.getRowNode(i);
                           if (node) node.setSelected(true);
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
                  />
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
                  columnDefs={column}
                  defaultColDef={defaultColDef}
                  rowModelType="infinite"
                  pagination={true}
                  cacheBlockSize={100}
                  paginationPageSize={100}
                  selection={selection}
                  paginationPageSizeSelector={paginationPageSizeSelector}
                  rowSelection={"multiple"}
                  onGridReady={onGridReady}
                  maxConcurrentDatasourceRequests={1}
                  infiniteInitialRowCount={100}
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
                  sx={{
                     m: 0,
                     p: 2,
                     textTransform: "uppercase",
                     letterSpacing: 6,
                  }}
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
                     Company ID :
                  </Typography>
                  <Typography sx={{ display: "inline" }}>
                     {" "}
                     {deleteData.id}
                  </Typography>
                  <Typography></Typography>
                  <Typography sx={{ fontWeight: "bold", display: "inline" }}>
                     Company Name :
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