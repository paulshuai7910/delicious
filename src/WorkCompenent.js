import React, { useState, useEffect } from "react";

function WorkCompenent() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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

  return (
    <div>
      <h1>Fetched Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.FoodItems}</li>
        ))}
      </ul>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
}

export default WorkCompenent;
