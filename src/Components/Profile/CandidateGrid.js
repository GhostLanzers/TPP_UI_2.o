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
   useMediaQuery,
   useTheme,
} from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import AxiosInstance from "../Main/AxiosInstance";
import "../../App.css";

var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export default function CandidateGrid() {
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
   const theme = useTheme();
   const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

   const type = searchParams.get("type") || "";
   const paramsObj = {};
   if (searchParams.has("companyId"))
      paramsObj.companyId = searchParams.get("companyId");
   if (searchParams.has("roleId"))
      paramsObj.roleId = searchParams.get("roleId");
   const urlParams = new URLSearchParams(paramsObj).toString();
   const [loadingToastId, setLoadingToastId] = useState(null);
   const url = `/candidate/data/${type}${urlParams ? "?" + urlParams : ""}`;

   useEffect(() => {
      let isMounted = true;
      const fetchAllPages = async () => {
         const startTime = performance.now();
         const toastId = toast.loading("Loading candidate data...");
         setLoadingToastId(toastId);
         try {
            const firstRes = await AxiosInstance.get(url, {
               params: { page: 1, limit: 1000 },
            });
            if (isMounted) setTableData(firstRes.data.candidates);

            const total = firstRes.data.total;
            const pageSize = 1000;
            const totalPages = Math.ceil(total / pageSize);

            let allCandidates = [...firstRes.data.candidates];

            for (let page = 2; page <= totalPages; page++) {
               const res = await AxiosInstance.get(url, {
                  params: { page, limit: pageSize },
               });
               allCandidates = allCandidates.concat(res.data.candidates);
            }

            if (isMounted) setTableData(allCandidates);
            const seconds = ((performance.now() - startTime) / 1000).toFixed(2);
            toast.update(toastId, {
               render: `Loaded ${allCandidates.length} candidates in ${seconds} seconds.`,
               type: "success",
               isLoading: false,
               autoClose: 4000,
            });
         } catch (error) {
            toast.update(toastId, {
               render: "Failed to fetch candidate data",
               type: "error",
               isLoading: false,
               autoClose: 4000,
            });
         }
      };
      fetchAllPages();
      return () => {
         isMounted = false;
         if (loadingToastId) toast.dismiss(loadingToastId);
      };
   }, [url]);

   const handleExcelExport = async () => {
      const selectedIds = gridapi.current.api
         .getSelectedRows()
         .map((row) => row._id);
      if (selectedIds.length === 0) {
         toast.error("No Rows selected");
         return;
      }
      const toastId = toast.loading("Exporting Excel...");
      try {
         const response = await AxiosInstance.post(
            "/candidate/excelExport",
            { ids: selectedIds, name: fileName },
            { responseType: "blob" }
         );
         const url = window.URL.createObjectURL(new Blob([response.data]));
         const link = document.createElement("a");
         link.href = url;
         link.setAttribute("download", `${fileName || "candidates"}.xlsx`);
         document.body.appendChild(link);
         link.click();
         link.remove();
         toast.update(toastId, {
            render: "Excel exported successfully!",
            type: "success",
            isLoading: false,
            autoClose: 4000,
         });
      } catch (error) {
         toast.update(toastId, {
            render: "Failed to export Excel",
            type: "error",
            isLoading: false,
            autoClose: 4000,
         });
      }
   };

   const column = [
      {
         headerName: "Actions",
         width: isAdmin ? "180px" : "150px",
         field: "assignedEmployee",
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
                        color="warning"
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
                              setOpen(true);
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
      // {
      //    headerName: "Contact",
      //    width: "140px",
      //    cellRenderer: (props) => {
      //       return (
      //          <>
      //             <Grid container columnSpacing={1}>
      //                <Grid item xs={6}>
      //                   <IconButton
      //                      aria-label="delete"
      //                      color="success"
      //                      href={`https://wa.me/${props.data.mobile[0]}`}
      //                      target="_blank"
      //                   >
      //                      <WhatsAppIcon />
      //                   </IconButton>
      //                </Grid>
      //                <Grid item xs={6}>
      //                   <IconButton aria-label="delete" color="warning">
      //                      <CallIcon />
      //                   </IconButton>
      //                </Grid>
      //             </Grid>
      //          </>
      //       );
      //    },
      // },
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
   ];

   const defaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
   };

   return (
      <div style={{ height: "100vh", width: "100vw" }}>
         {/* Top Toolbar */}
         {!rtAccess && (
            <Grid
               container
               spacing={2}
               alignItems="center"
               sx={{
                  pt: "9vh",
                  px: isSmall ? 1 : 3,
                  width: "100vw",
                  flexWrap: "wrap",
               }}
            >
               <Grid item xs={6} sm={2} md={1}>
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
               <Grid item xs={6} sm={2}>
                  <Button
                     fullWidth
                     variant="contained"
                     color="success"
                     className="gridButton"
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
               <Grid item xs={12} sm={2} md={4}/>
               <Grid item xs={12} sm={3}>
                  <TextField
                     size="small"
                     label="File Name"
                     value={fileName}
                     className="tw"
                     fullWidth
                     onChange={(e) => setFileName(e.target.value)}
                  />
               </Grid>
               <Grid item xs={12} sm={3} md={2}>
                  <Button
                     fullWidth
                     variant="contained"
                     color="inherit"
                     className="gridButton"
                     onClick={handleExcelExport}
                  >
                     Export Excel
                  </Button>
               </Grid>
            </Grid>
         )}

         {/* AG Grid */}
         <div
            className="ag-theme-quartz-dark"
            style={{
               marginTop: "2vh",
               marginLeft: isSmall ? "2%" : "1%",
               height: "80vh",
               width: isSmall ? "96%" : "98%",
            }}
         >
            <AgGridReact
               ref={gridapi}
               rowData={tableData}
               columnDefs={column}
               defaultColDef={defaultColDef}
               pagination={true}
               paginationPageSize={100}
               rowSelection="multiple"
            />
         </div>

         {/* Delete Dialog */}
         <Dialog
            open={open}
            onClose={() => setOpen(false)}
            sx={{
               backgroundColor: "transparent",
               "& .MuiDialog-paper": {
                  backgroundColor: "transparent",
                  backdropFilter: "blur(2px)",
                  boxShadow: "none",
                  color: "white",
               },
            }}
         >
            <DialogTitle
               sx={{
                  textTransform: "uppercase",
                  letterSpacing: 6,
               }}
               //id="customized-dialog-title"
            >
               Confirm Delete
            </DialogTitle>
            <IconButton
               aria-label="close"
               onClick={() => setOpen(false)}
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
               <Typography gutterBottom sx={{ fontWeight: "bold" }}>
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
                  sx={{ backgroundColor: alpha("#FF0000", 0.7) }}
                  onClick={() => {
                     AxiosInstance.delete("/candidate/" + deleteData._id)
                        .then(() => {
                           setTableData((prev) =>
                              prev.filter((d) => d._id !== deleteData._id)
                           );
                           toast.success("Candidate deleted successfully");
                        })
                        .catch(() => toast.error("Failed to delete candidate"));
                     setOpen(false);
                  }}
               >
                  Delete
               </Button>
               <Button
                  variant="contained"
                  size="large"
                  //sx={{ backgroundColor: alpha("#0000FF", 0.5) }}
                  onClick={() => setOpen(false)}
               >
                  Cancel
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}
