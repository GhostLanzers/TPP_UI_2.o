import React from "react";
import {
   Card,
   Container,
   Grid,
   CardContent,
   Button,
   styled,
   alpha,
   Box,
   Typography,
} from "@mui/material";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import ExcelExport from "./ExcelExport";
import { useSelector } from "react-redux";
import AxiosInstance from "./AxiosInstance";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function Bulkupload() {
   const { userid } = useSelector((state) => state.user);

   const VisuallyHiddenInput = styled("input")({
      clip: "rect(0 0 0 0)",
      clipPath: "inset(50%)",
      height: 1,
      overflow: "hidden",
      position: "absolute",
      bottom: 0,
      left: 0,
      whiteSpace: "nowrap",
      width: 1,
   });

   // === Your file handlers remain the same ===
   const handleCompanyFileUpload = async (e) => { /* unchanged */ };
   const handleEmployeeFileUpload = async (e) => { /* unchanged */ };
   const handleCandidateFileUpload = async (e) => { /* unchanged */ };

   // CARD STYLE
   const cardsStyle = {
   background: "rgba(255, 255, 255, 0.05)", // subtle glass look
   backdropFilter: "blur(5px)", // smoother blur
   color: "white",
   borderRadius: "20px",
   borderLeftStyle: "solid",
   borderLeftWidth: "0.5vw",
   boxShadow: "0 8px 20px rgba(0,0,0,0.25)", // soft shadow
   transition: "all 0.3s ease",
   "&:hover": {
      transform: "translateY(-5px) scale(1.02)", // lift effect
      boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
      background: "rgba(255, 255, 255, 0.1)", // brighten on hover
      borderColor: "#FFF700",
      borderLeftWidth: "1vh",
   },
};
   // const cardsStyle = {
   //    backgroundColor: "transparent",
   //    backdropFilter: "blur(70px)",
   //    color: "white",
   //    borderRadius: "20px",
   //    borderLeftStyle: "solid",
   //    borderLeftWidth: "0.5vh",
   //    height: "100%",
   //    display: "flex",
   //    flexDirection: "column",
   //    justifyContent: "space-between",
   // };

   return (
      <Container
         disableGutters
         maxWidth="xl"
         sx={{
            paddingTop: { xs: "12vh", md: "20vh" },
            paddingBottom: "4vh",
            px: { xs: 2, sm: 4, md: 6 },
         }}
      >
         <Grid container spacing={3}>
            {/* COMPANY BULK */}
            <Grid item xs={12} md={6} lg={3}>
               <Card sx={{ ...cardsStyle, borderLeftColor: "#00FFFF" }}>
                  <Box>
                     <CardContent sx={{ pb: 1 }}>
                        <Typography variant="h6" fontWeight="light" textAlign="center" letterSpacing={4}>
                           COMPANY
                        </Typography>
                     </CardContent>
                  </Box>
                  <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center">
                     <CardContent sx={{ width: "100%" }}>
                        <Button
                           fullWidth
                           size="large"
                           sx={{
                              backgroundColor: alpha("#0000FF", 0.5),
                              mb: 2,
                           }}
                           variant="contained"
                           component="label"
                           tabIndex={-1}
                           startIcon={<CloudUploadIcon />}
                        >
                           Bulk Upload
                           <VisuallyHiddenInput
                              type="file"
                              onChange={handleCompanyFileUpload}
                           />
                        </Button>
                        <ExcelExport
                           excelData={[{ companyName: "", HRName: "", HRMobile: "value1,value2", HREmail: "", about: "", remarks: "", response: "", empanelled: "TRUE/FALSE", companyType: "" }]}
                           fileName={"Company Template"}
                           buttonName={"Bulk Template"}
                        />
                     </CardContent>
                  </Box>
               </Card>
            </Grid>

            {/* EMPLOYEE BULK */}
            <Grid item xs={12} md={6} lg={3}>
               <Card sx={{ ...cardsStyle, borderLeftColor: "#00FF00" }}>
                  <Box>
                     <CardContent sx={{ pb: 1 }}>
                        <Typography variant="h6" fontWeight="light" textAlign="center" letterSpacing={4}>
                           EMPLOYEE
                        </Typography>
                     </CardContent>
                  </Box>
                  <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center">
                     <CardContent sx={{ width: "100%" }}>
                        <Button
                           fullWidth
                           size="large"
                           sx={{
                              backgroundColor: alpha("#0000FF", 0.5),
                              mb: 2,
                           }}
                           variant="contained"
                           component="label"
                           tabIndex={-1}
                           startIcon={<CloudUploadIcon />}
                        >
                           Bulk Upload
                           <VisuallyHiddenInput
                              type="file"
                              onChange={handleEmployeeFileUpload}
                           />
                        </Button>
                        <ExcelExport
                           excelData={[{ name: "", mobile: "", parentMobile: "", email: "", gender: "Male/Female", DOB: "", DOJ: "", documentation: "1/0", status: "1/0", employeeType: "" }]}
                           fileName={"Employee Template"}
                           buttonName={"Bulk Template"}
                        />
                     </CardContent>
                  </Box>
               </Card>
            </Grid>

            {/* CANDIDATE BULK */}
            <Grid item xs={12} md={6} lg={3}>
               <Card sx={{ ...cardsStyle, borderLeftColor: "#FF5C00" }}>
                  <Box>
                     <CardContent sx={{ pb: 1 }}>
                        <Typography variant="h6" fontWeight="light" textAlign="center" letterSpacing={4}>
                           CANDIDATE
                        </Typography>
                     </CardContent>
                  </Box>
                  <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center">
                     <CardContent sx={{ width: "100%" }}>
                        <Button
                           fullWidth
                           size="large"
                           sx={{
                              backgroundColor: alpha("#0000FF", 0.5),
                              mb: 2,
                           }}
                           variant="contained"
                           component="label"
                           tabIndex={-1}
                           startIcon={<CloudUploadIcon />}
                        >
                           Bulk Upload
                           <VisuallyHiddenInput
                              type="file"
                              onChange={handleCandidateFileUpload}
                           />
                        </Button>
                        <ExcelExport
                           excelData={[{ fullName: "", mobile: "9876543210,9123456789", email: "abc@example.com,xyz@example.com", skills: "Java,Python" }]}
                           fileName={"Candidate Template"}
                           buttonName={"Bulk Template"}
                        />
                     </CardContent>
                  </Box>
               </Card>
            </Grid>

            {/* COMPANY ROLE BULK */}
            <Grid item xs={12} md={6} lg={3}>
               <Card sx={{ ...cardsStyle, borderLeftColor: "#FF0000" }}>
                  <Box>
                     <CardContent sx={{ pb: 1 }}>
                        <Typography variant="h6" fontWeight="light" textAlign="center" letterSpacing={4}>
                           COMPANY ROLE
                        </Typography>
                     </CardContent>
                  </Box>
                  <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center">
                     <CardContent sx={{ width: "100%" }}>
                        <Button
                           fullWidth
                           size="large"
                           sx={{
                              backgroundColor: alpha("#0000FF", 0.5),
                              mb: 2,
                           }}
                           variant="contained"
                           component="label"
                           disabled
                           tabIndex={-1}
                           startIcon={<CloudUploadIcon />}
                        >
                           Bulk Upload
                        </Button>
                        <ExcelExport
                           excelData={[{ name: "", mobile: "", email: "" }]}
                           fileName={"Role Template"}
                           buttonName={"Bulk Template"}
                           disabled
                        />
                     </CardContent>
                  </Box>
               </Card>
            </Grid>
         </Grid>
      </Container>
   );
}
