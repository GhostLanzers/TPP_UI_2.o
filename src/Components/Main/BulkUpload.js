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
import _ from "lodash";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
import ExcelExport from "./ExcelExport";
import { useSelector } from "react-redux";
import AxiosInstance from "./AxiosInstance";

export default function Bulkupload(props) {
   const { employeeType, userid } = useSelector((state) => state.user);
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
   const handleCompanyFileUpload = async (e) => {
      const file = e.target.files[0];

      const reader = new FileReader();

      reader.onload = async (event) => {
         const workbook = XLSX.read(event.target.result, { type: "binary" });
         const sheetName = workbook.SheetNames[0];
         const sheet = workbook.Sheets[sheetName];
         var sheetData = XLSX.utils.sheet_to_json(sheet);

         const data = sheetData.map((sheet) => {
            var { HRMobile, HRName, HREmail, empanelled, ...rest } = sheet;
            const HRMobileList = String(HRMobile).includes(", ")
               ? HRMobile.split(", ")
               : [HRMobile];
            const HREmailList = String(HREmail).includes(",")
               ? HREmail.split(",")
               : [HREmail];
            const HRNameList = String(HRName).includes(",")
               ? HRName.split(",")
               : [HRName];
            const HRList = HRNameList.map((hrname, i) => {
               return {
                  HRName: hrname,
                  HREmail: HREmailList[i],
                  HRMobile: [HRMobileList[i]],
               };
            });
            return {
               ...rest,
               HR: HRList,
               empanelled: empanelled === "TRUE",
            };
         });
         const resp = await AxiosInstance.post("/company/bulkinsert", data);
         toast.promise(resp, {
            pending: "Data is Uploading. Please wait....",
            success: "Company Data Uploaded",
            error: {
               render({ data }) {
                  return (
                     "Could insert only " +
                     String(data.response.data.message.result.insertedCount) +
                     " Rows"
                  );
               },
            },
         });

         e.target.value = null;
      };
      reader.readAsBinaryString(file);
   };
   const handleEmployeeFileUpload = async (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = async (event) => {
         const workbook = XLSX.read(event.target.result, { type: "binary" });
         const sheetName = workbook.SheetNames[0];
         const sheet = workbook.Sheets[sheetName];
         const sheetData = XLSX.utils.sheet_to_json(sheet);
         const data = sheetData.map((row) => {
            var { gender, documentation, status, DOJ, DOB, ...rest } = row;
            gender = !gender ? "Male" : gender;
            documentation = !documentation ? 0 : documentation;
            status = !status ? 1 : status;
            DOJ = !DOJ ? new Date() : DOJ;
            DOB = !DOB ? new Date() : DOB;
            return { gender, documentation, status, DOJ, DOB, ...rest };
         });
         const resp = await AxiosInstance.post("/employee/bulkinsert", data);
         toast.promise(resp, {
            pending: "Data is Uploading. Please wait....",
            success: "Employee Data Uploaded",
            error: {
               render({ data }) {
                  return (
                     "Could insert only " +
                     String(data.response.data.message.result.insertedCount) +
                     " Rows"
                  );
               },
            },
         });

         e.target.value = null;
      };
      reader.readAsBinaryString(file);
   };
const handleCandidateFileUpload = async (e) => {
   const file = e.target.files[0];
   const reader = new FileReader();

   reader.onload = async (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);

      // Helper to convert Excel date to JS Date
      const excelDateToJSDate = (excelDate) => {
         if (!excelDate) return null;
         // If already a string, try to parse
         if (typeof excelDate === "string" && !isNaN(Date.parse(excelDate))) {
            return new Date(excelDate);
         }
         // Excel stores dates as numbers (days since 1899-12-31)
         return new Date(Math.round((excelDate - 25569) * 86400 * 1000));
      };

      const data = sheetData.map((sd, idx) => {
         // Parse and validate fields
         const errors = [];

         // Required fields
         if (
            !sd.fullName ||
            typeof sd.fullName !== "string" ||
            sd.fullName.trim() === ""
         ) {
            errors.push("Full Name is required");
         }

         // Mobile validation
         let mobileList = [];
         if (sd.mobile) {
            mobileList = String(sd.mobile)
               .split(",")
               .map((m) => m.trim());
            if (!mobileList.every((v) => /^[0-9]{10}$/.test(v))) {
               errors.push("Each mobile must be a 10-digit number");
            }
         } else {
            errors.push("Mobile is required");
         }

         // Email validation
         let emailList = [];
         if (sd.email) {
            emailList = String(sd.email)
               .split(",")
               .map((e) => e.trim());
            if (!emailList.every((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))) {
               errors.push("Invalid email format");
            }
         }

         // Skills
         const skillList = sd.skills
            ? String(sd.skills)
                 .split(",")
                 .map((s) => s.trim())
            : [];

         // Qualifications
         let qualifications = [];
         if (sd.qualification && sd.YOP) {
            const qualArr = String(sd.qualification).split(",");
            const yopArr = String(sd.YOP).split(",");
            qualifications = qualArr.map((q, i) => ({
               qualification: q.trim(),
               YOP: yopArr[i] ? yopArr[i].trim() : "",
            }));
         }

         // Languages
         let languages = [];
         if (sd.language && sd.level) {
            const langArr = String(sd.language).split(",");
            const levelArr = String(sd.level).split(",");
            const remarkArr = sd.languageRemark
               ? String(sd.languageRemark).split(",")
               : [];
            languages = langArr.map((l, i) => ({
               language: l.trim(),
               level: levelArr[i] ? levelArr[i].trim() : "Poor",
               remarks: remarkArr[i] ? remarkArr[i].trim() : "",
            }));
         }

         // Experience
         let experience = [];
         if (
            sd.companyName &&
            sd.role &&
            sd.salary &&
            sd.startDate &&
            sd.endDate
         ) {
            experience = [
               {
                  companyName: sd.companyName,
                  role: sd.role,
                  salary: Number(sd.salary),
                  startDate: excelDateToJSDate(sd.startDate),
                  endDate: excelDateToJSDate(sd.endDate),
                  experience:
                     sd.startDate && sd.endDate
                        ? Math.round(
                             (excelDateToJSDate(sd.endDate).getTime() -
                                excelDateToJSDate(sd.startDate).getTime()) /
                                1000 /
                                (60 * 60 * 24) /
                                365.25
                          )
                        : null,
               },
            ];
         }

         // Date fields
         const interviewDate = excelDateToJSDate(sd.interviewDate);
         const onboardingDate = excelDateToJSDate(sd.onboardingDate);
         const nextTrackingDate = excelDateToJSDate(sd.nextTrackingDate);
         const billingDate = excelDateToJSDate(sd.billingDate);
         const invoiceDate = excelDateToJSDate(sd.invoiceDate);

         // Numeric validations
         if (sd.rate && isNaN(Number(sd.rate))) {
            errors.push("Rate must be a number");
         }

         // Final object
         return {
            ...sd,
            errors,
            languages,
            mobile: mobileList,
            email: emailList,
            skills: skillList,
            qualifications,
            interviewDate,
            onboardingDate,
            nextTrackingDate,
            billingDate,
            invoiceDate,
            experience,
            assignedEmployee: userid,
            createdByEmployee: userid,
         };
      });

      // Filter out invalid rows and show errors
      const invalidRows = data.filter(
         (row) => row.errors && row.errors.length > 0
      );
      if (invalidRows.length > 0) {
         toast.error(
            `Validation failed for ${invalidRows.length} row(s):\n` +
               invalidRows
                  .map((row, idx) => `Row ${idx + 2}: ${row.errors.join(", ")}`)
                  .join("\n")
         );
         e.target.value = null;
         return;
      }

      // Remove errors property before sending to backend
      const validData = data.map(({ errors, ...rest }) => rest);

      const resp = await AxiosInstance.post("/candidate/bulkinsert", validData);
      toast.promise(resp, {
         pending: "Data is Uploading. Please wait....",
         success: "Candidate Data Uploaded",
         error: {
            render({ data }) {
               return (
                  "Could insert only " +
                  String(data.response.data.message.result.insertedCount) +
                  " Rows"
               );
            },
         },
      });

      e.target.value = null;
   };
   reader.readAsBinaryString(file);
};

   //CARDS INLINE CSS
   const cardsStyle = {
      backgroundColor: "transparent",
      backdropFilter: "blur(70px)",
      color: "white",
      borderRadius: "20px",
      borderLeftStyle: "solid",
      borderLeftWidth: "0.5vh",
   };

   //JSX CODE
   return (
      <>
         {/*NEW CODE FOR BULK UPLOAD*/}
         <Container
            disableGutters
            maxWidth={false}
            sx={{ paddingTop: "20vh", width: "60%", paddingBottom: "2vh" }}
         >
            <Grid container columnSpacing={5} rowSpacing={2}>
               {/*Company Bulk*/}
               <Grid item xs={6}>
                  <Card sx={{ ...cardsStyle, borderLeftColor: "#00FFFF" }}>
                     <Box>
                        <CardContent sx={{ maxHeight: "5vh" }}>
                           <Typography
                              variant="h6"
                              textTransform="uppercase"
                              fontWeight="bold"
                           >
                              COMPANY
                           </Typography>
                        </CardContent>
                     </Box>
                     <Box>
                        <CardContent
                           sx={{
                              paddingTop: "4vh",
                              width: "70%",
                              marginLeft: "15%",
                           }}
                        >
                           <Button
                              fullWidth
                              size="large"
                              sx={{
                                 backgroundColor: alpha("#0000FF", 0.5),
                                 height: "100%",
                                 marginBottom: "1vh",
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
                              sx={{ height: "100%" }}
                              excelData={[
                                 {
                                    companyName: "",
                                    HRName: "",
                                    HRMobile: "value1,value2",
                                    HREmail: "",
                                    about: "",
                                    remarks: "",
                                    response: "",
                                    empanelled: "TRUE/FALSE",
                                    companyType: "",
                                 },
                              ]}
                              fileName={"Company Template"}
                              buttonName={"Bulk Template"}
                           />
                        </CardContent>
                     </Box>
                  </Card>
               </Grid>
               {/*End of Company Bulk*/}
               {/*Company Role Bulk*/}
               <Grid item xs={6}>
                  <Card sx={{ ...cardsStyle, borderLeftColor: "#00FF00" }}>
                     <Box>
                        <CardContent sx={{ maxHeight: "5vh" }}>
                           <Typography variant="h6" fontWeight="bold">
                              EMPLOYEE
                           </Typography>
                        </CardContent>
                     </Box>
                     <Box>
                        <CardContent
                           sx={{
                              paddingTop: "4vh",
                              width: "70%",
                              marginLeft: "15%",
                           }}
                        >
                           <Button
                              fullWidth
                              size="large"
                              sx={{
                                 backgroundColor: alpha("#0000FF", 0.5),
                                 height: "100%",
                                 marginBottom: "1vh",
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
                              sx={{ height: "100%" }}
                              excelData={[
                                 {
                                    name: "",
                                    mobile: "",
                                    parentMobile: "",
                                    email: "",
                                    gender: "Male/Female",
                                    DOB: "",
                                    DOJ: "",
                                    documentation: "1/0",
                                    status: "1/0",
                                    employeeType: "",
                                 },
                              ]}
                              fileName={"Employee Template"}
                              buttonName={"Bulk Template"}
                           />
                        </CardContent>
                     </Box>
                  </Card>
               </Grid>
               {/*End of Employee Bulk*/}
               {/*Candidate Bulk*/}
               <Grid item xs={6}>
                  <Card sx={{ ...cardsStyle, borderLeftColor: "#FF5C00" }}>
                     <Box>
                        <CardContent sx={{ maxHeight: "5vh" }}>
                           <Typography variant="h6" fontWeight="bold">
                              CANDIDATE
                           </Typography>
                        </CardContent>
                     </Box>
                     <Box>
                        <CardContent
                           sx={{
                              paddingTop: "4vh",
                              width: "70%",
                              marginLeft: "15%",
                           }}
                        >
                           <Button
                              fullWidth
                              size="large"
                              sx={{
                                 backgroundColor: alpha("#0000FF", 0.5),
                                 height: "100%",
                                 marginBottom: "1vh",
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
                              sx={{ height: "100%" }}
                              excelData={[
                                 {
                                    fullName: "",
                                    mobile: "9876543210,9123456789", // comma separated, 10 digits each
                                    email: "abc@example.com,xyz@example.com", // comma separated
                                    homeTown: "",
                                    currentCity: "",
                                    skills: "Java,Python", // comma separated
                                    qualifications: "B.Tech,2020;M.Tech,2022", // semicolon separated pairs
                                    languages:
                                       "English:Good:Remark1,Hindi:Poor:Remark2", // language:level:remark, comma separated
                                    experience:
                                       "CompanyA:Developer:50000:2020-01-01:2021-01-01:1", // company:role:salary:start:end:years, comma separated
                                    companyId: "",
                                    roleId: "",
                                    interviewDate: "",
                                    remarks: "",
                                    interviewStatus: "",
                                    select: "",
                                    EMP_ID: "",
                                    onboardingDate: "",
                                    nextTrackingDate: "",
                                    billingDate: "",
                                    invoiceNumber: "",
                                    invoiceDate: "",
                                    l1Assessment: "",
                                    l2Assessment: "",
                                 },
                              ]}
                              fileName={"Candidate Template"}
                              buttonName={"Bulk Template"}
                           />
                        </CardContent>
                     </Box>
                  </Card>
               </Grid>
               {/*End of Candidate Bulk*/}
               {/*Company Role Bulk*/}
               <Grid item xs={6}>
                  <Card sx={{ ...cardsStyle, borderLeftColor: "#FF0000" }}>
                     <Box>
                        <CardContent sx={{ maxHeight: "5vh" }}>
                           <Typography variant="h6" fontWeight="bold">
                              COMPANY ROLE
                           </Typography>
                        </CardContent>
                     </Box>
                     <Box>
                        <CardContent
                           sx={{
                              paddingTop: "4vh",
                              width: "70%",
                              marginLeft: "15%",
                           }}
                        >
                           <Button
                              fullWidth
                              size="large"
                              sx={{
                                 backgroundColor: alpha("#0000FF", 0.5),
                                 height: "100%",
                                 marginBottom: "1vh",
                              }}
                              variant="contained"
                              component="label"
                              disabled={true}
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
                              sx={{ height: "100%" }}
                              excelData={[
                                 {
                                    name: "",
                                    mobile: "",
                                    parentMobile: "",
                                    email: "",
                                    gender: "Male/Female",
                                    DOB: "",
                                    DOJ: "",
                                    documentation: "1/0",
                                    status: "1/0",
                                    employeeType: "",
                                 },
                              ]}
                              fileName={"Role Template"}
                              buttonName={"Bulk Template"}
                              disabled={true}
                           />
                        </CardContent>
                     </Box>
                  </Card>
               </Grid>
               {/*End of Company Role Bulk*/}
            </Grid>
         </Container>
         {/*EOD OF NEW CODE FOR BULK UPLOAD*/}
      </>
   );
}
