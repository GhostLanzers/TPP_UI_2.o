import React from "react";
import { Button, alpha } from "@mui/material";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { flatten } from "flat";

const ExcelExport = ({ excelData=null,gridRef, fileName, buttonName = "Download" }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const exportToExcel = async () => {
    let expdata = excelData
    if(gridRef?.current && !excelData)
      expdata = gridRef.current.api.getSelectedRows().map((l)=>flatten(l));
    const ws = XLSX.utils.json_to_sheet(expdata);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<CloudDownloadIcon />}
        onClick={(e) => exportToExcel(fileName)}
        color="success"
        sx={{ cursor: "pointer", height:"100%", backgroundColor: alpha("#008000", 0.5) }}
        fullWidth
      >
        {buttonName}
      </Button>
    </>
  );
};
export default ExcelExport;