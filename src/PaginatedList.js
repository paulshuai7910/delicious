import React, { useState, useEffect, useCallback, useMemo } from "react";
import BaiduMap from "./BaiduMap";
import NearList from "./NearList";
import ListItem from "./ListItem";

const PaginatedList = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [locationDation, setLocationDation] = useState(null);
  const [currentData, setData] = useState([]);
  const pageSize = 10;

  const fetchDataFromIndexedDB = () => {
    const request = indexedDB.open("MyDatabase", 1);

    request.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(["MyDataStore"], "readonly");
      const objectStore = transaction.objectStore("MyDataStore");

      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const dataRequest = objectStore.openCursor();
      let results = [];
      let count = 0;

      dataRequest.onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor && count < endIndex) {
          if (count >= startIndex) {
            results.push(cursor.value);
          }
          count++;
          cursor.continue();
        } else {
          setData(results);
        }
      };
    };

    request.onerror = function (event) {
      console.error("Error opening IndexedDB:", event);
    };
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  useEffect(() => {
    fetchDataFromIndexedDB();
  }, [currentPage]);

  useEffect(() => {
    currentData.length && setLocationDation(currentData[0]);
  }, [currentData]);

  const handleLocalInMap = useCallback(
    (item) => {
      setLocationDation(item);
    },
    [currentData]
  );
  const currentList = useMemo(() => {
    return currentData.map((item) => (
      <ListItem item={item} handleLocalInMap={handleLocalInMap} />
    ));
  }, [currentData]);

  return (
    <div className="paginated_container">
      <div className="paginated_container_data">
        <div>
          <h1>Today Delicious (all data)</h1>
          <div className="paginated_container_data_list">{currentList}</div>
          <div className="paginated_container_data_btns">
            <button
              className="btn"
              onClick={handlePrevPage}
              // disabled={new Boolean(currentPage === 1)}
            >
              Previous
            </button>
            <div className="btn" onClick={handleNextPage}>
              Next
            </div>
          </div>
        </div>
        <NearList />
      </div>
      <div key="paginated_container_map">
        {locationDation && <BaiduMap locationDation={locationDation} />}
      </div>
    </div>
  );
};

export default PaginatedList;
