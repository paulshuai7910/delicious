import React, { useState, useEffect } from "react";
import PaginatedList from "./PaginatedList";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimpleSlider from "./Slick";
const CsvDataFetcher = () => {
  const [csvData, setCsvData] = useState(null);

  useEffect(() => {
    const fetchCsvData = async () => {
      try {
        const response = await fetch("http://192.168.31.154:3001/csv");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.text(); // 假设后端返回的是CSV格式的文本
        // 这里可以进一步处理data，比如解析CSV字符串为JSON对象数组
        // 或者直接展示在UI上
        setCsvData(JSON.parse(data));
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    fetchCsvData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {csvData && <SimpleSlider allData={csvData} />}
      {csvData ? (
        <PaginatedList allData={csvData} />
      ) : (
        <p>Loading Food data...</p>
      )}
    </div>
  );
};

export default CsvDataFetcher;
