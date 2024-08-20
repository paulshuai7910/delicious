import React, { useState } from "react";
import BaiduMap from "./BaiduMap";
function PaginatedList({ allData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [locationDation, setLocationDation] = useState(allData[0]);

  const pageSize = 10;

  const currentData = allData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleNextPage = () => {
    const nextPage = Math.min(
      currentPage + 1,
      Math.ceil(allData.length / pageSize)
    );
    setCurrentPage(nextPage);
  };

  const totalPages = Math.ceil(allData.length / pageSize);
  const handleNextMap = (item) => {
    setLocationDation(item);
  };
  console.log("locationDation", locationDation, locationDation.Latitude);
  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100vw" }}>
      <div>
        <ul>
          {currentData.map((item) => (
            <li key={item.x}>
              <b>Today Delicious:</b> {item.FoodItems}
              <br />
              <button
                onClick={() => {
                  handleNextMap(item);
                }}
              >
                show this delicious location
              </button>
            </li>
          ))}
        </ul>
        {currentPage < totalPages && (
          <button onClick={handleNextPage}>下一页</button>
        )}
      </div>
      <div>
        {allData.length > 0 && (
          <BaiduMap
            longitude={locationDation.Longitude}
            latitude={locationDation.Latitude}
          />
        )}
      </div>
    </div>
  );
}

export default PaginatedList;
