import React, { useState, useEffect, useMemo } from "react";
import {
   Button,
   Grid,
   Dialog,
   DialogContent,
   DialogActions,
   Typography,
   DialogTitle,
   IconButton,
   TextField,
   alpha,
} from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ExcelExport from "../../Components/Main/ExcelExport";
import { toast } from "react-toastify";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import AxiosInstance from "../Main/AxiosInstance";
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export default function CandidateGrid() {
   // STATES HANDLING AND VARIABLES
   const [open, setOpen] = useState(false);
   const [deleteData, setDeleteData] = useState({});
   const { employeeType, userid } = useSelector((state) => state.user);
   const rtAccess = ["Recruiter", "Intern", "Teamlead"].includes(employeeType);
   const empId = userid;
   const isAdmin = employeeType === "Admin";
   const [tableData, setTableData] = useState([]);
   const gridapi = React.useRef();
   const [fileName, setFileName] = useState(String(new Date()));
   const [count, setCount] = useState(0);
   const [searchParams] = useSearchParams();

   // Build URL with URLSearchParams for safety
   const type = searchParams.get("type") || "";
   const paramsObj = {};
   if (searchParams.has("companyId"))
      paramsObj.companyId = searchParams.get("companyId");
   if (searchParams.has("roleId"))
      paramsObj.roleId = searchParams.get("roleId");
   const urlParams = new URLSearchParams(paramsObj).toString();
   const url = `/candidate/data/${type}${urlParams ? "?" + urlParams : ""}`;
   const urlId = `/candidate/dataId/${type}${urlParams ? "?" + urlParams : ""}`;
   useEffect(() => {
      let isMounted = true;
      const fetchData = async () => {
         try {
            const res = await AxiosInstance.get(url);
            if (isMounted) setTableData(res.data);
         } catch (error) {
            toast.error("Failed to fetch candidate data");
         }
      };
      fetchData();
      return () => {
         isMounted = false;
      };
   }, [url]);

   // GRID HEADER/COLOUMS HANDLING
   const column = [
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
            if (!props.data) return null;
            return (
               <Grid container columnSpacing={0}>
                  <Grid item xs={isAdmin ? 4 : 6}>
                     <IconButton
                        color="primary"
                        size="small"
                        href={`/EditCandidate/${props.data._id}?edit=false`}
                     >
                        <VisibilityTwoToneIcon />
                     </IconButton>
                  </Grid>
                  <Grid item xs={isAdmin ? 4 : 6}>
                     <IconButton
                        size="small"
                        color="secondary"
                        href={`/EditCandidate/${props.data._id}?edit=true`}
                        disabled={
                           !rtAccess
                              ? false
                              : props.data.assignedEmployee === empId
                              ? true
                              : false
                        }
                     >
                        <BorderColorTwoToneIcon />
                     </IconButton>
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
            );
         },
      },
      {
         headerName: "Contact",
         width: "140px",
         cellRenderer: (props) => {
            if (!props.data) return null;
            return (
               <Grid container columnSpacing={1}>
                  <Grid item xs={6}>
                     <IconButton
                        aria-label="whatsapp"
                        color="success"
                        href={`https://wa.me/${props.data?.mobile?.[0] || ""}`}
                        target="_blank"
                        disabled={!props.data?.mobile?.[0]}
                     >
                        <WhatsAppIcon />
                     </IconButton>
                  </Grid>
                  <Grid item xs={6}>
                     <IconButton
                        aria-label="call"
                        color="warning"
                        disabled={!props.data?.mobile?.[0]}
                     >
                        <CallIcon />
                     </IconButton>
                  </Grid>
               </Grid>
            );
         },
      },
      {
         headerName: "Created By",
         field: "createdByEmployee.name",
         valueGetter: (params) => params.data?.createdByEmployee?.name,
         headerCheckboxSelection: true,
         checkboxSelection: true,
         headerCheckboxSelectionFilteredOnly: true,
      },
      {
         headerName: "Assigned to",
         field: "assignedEmployee.name",
         valueGetter: (params) => params.data?.assignedEmployee?.name,
      },
      { headerName: "Candidate Name", field: "fullName" },
      { headerName: "Candidate ID", field: "candidateId" },
      { headerName: "Candidate Number", field: "mobile", sortable: false },
      { headerName: "Candidate Email ID", field: "email" },
      { headerName: "L1 Assessment", field: "l1Assessment" },
      { headerName: "L2 Assessment", field: "l2Assessment" },
      {
         headerName: "Company",
         field: "companyId.companyName",
         valueGetter: (params) => params.data?.companyId?.companyName,
      },
      {
         headerName: "Role",
         field: "roleId.role",
         valueGetter: (params) => params.data?.roleId?.role,
      },
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
   ];

   const defaultColDef = {
      sortable: true,
      editable: false,
      cellEditor: false,
      filter: true,
      rowSelection: "multiple",
   };

   const selection = useMemo(
      () => ({
         mode: "multiRow",
         groupSelects: "descendants",
      }),
      []
   );
   const paginationPageSizeSelector = useMemo(() => [200, 500, 1000], []);

   // FUNCTIONS HANDLING
   const handleClickOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const handleDelete = async (id) => {
      try {
         await AxiosInstance.delete("/candidate/" + id);
         setTableData((prev) => prev.filter((d) => d._id !== id));
         handleClose();
         toast.success("Candidate deleted successfully");
      } catch (error) {
         toast.error("Failed to delete candidate");
      }
   };

   // AG Grid Infinite Row Model datasource
   const datasource = {
      getRows: (params) => {
         const { startRow, endRow } = params;
         const limit = endRow - startRow;
         const page = Math.floor(startRow / limit) + 1;

         AxiosInstance.get(url, {
            params: {
               page: page,
               limit: limit,
            },
         })
            .then((response) => {
               const data = response.data;

               params.successCallback(data.candidates, data.total);
            })
            .catch(() => {
               params.failCallback();
            });
      },
   };

   const onGridReady = (params) => {
      params.api.setDatasource(datasource);
   };

   // JSX CODE
   return (
      <>
         <div style={{ height: "100vh", width: "100vw" }}>
            <Grid
               container
               spacing={2}
               sx={{ paddingTop: "9vh", marginLeft: "0.5%", width: "98%" }}
            >
               {!rtAccess && (
                  <>
                     <Grid item xs={2} md={1}>
                        <TextField
                           fullWidth
                           size="small"
                           type="number"
                           label="No.of Rows"
                           className="tw"
                           value={count}
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
                                 const node =
                                    gridapi?.current?.api?.getRowNode(i);
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
                  </>
               )}
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
                  pagination={true}
                  rowModelType="infinite"
                  paginationPageSize={100}
                  selection={selection}
                  cacheBlockSize={100}
                  paginationPageSizeSelector={paginationPageSizeSelector}
                  rowSelection={"multiple"}
                  onGridReady={onGridReady}
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
                     Candidate ID :
                  </Typography>
                  <Typography sx={{ display: "inline" }}>
                     {" "}
                     {deleteData.id}
                  </Typography>
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
