import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { callApi } from "../../api/apiCaller";
import Loader from "../../components/loader/loader";
import routes from "../../api/routes";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { GreenNotify } from "../../helper/helper";

const ExcelToJson = () => {
  const [excelData, setExcelData] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setExcelData(jsonData);
      };
      reader.readAsBinaryString(file);
    }
  };

  const getAllQuotes = () => {
    let getRes = (res) => {
      console.log("res of getQuotes", res);
    };

    callApi("GET", routes.getAllQuotes, null, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };

  useEffect(() => {
    getAllQuotes();
  }, []);

  const body = excelData;

  const createQuote = () => {
    let getRes = (res) => {
      console.log("res of createQuote", res);
      GreenNotify("Quote is uploaded successfully");
      navigate("/quotes");
    };
    callApi("POST", routes.createQuote, body, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };

  return (
    <div style={{ padding: "4rem" }}>
      <Loader loading={isloading} />
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <Button onClick={createQuote}>Upload</Button>
      {excelData && (
        <div>
          <h2>Excel Data:</h2>
          <pre>{JSON.stringify(excelData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ExcelToJson;
