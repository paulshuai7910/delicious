import React, { useEffect, useState } from "react";
import { findNearestRestaurants } from "./utils/util";
import { FixedSizeList as List } from "react-window";

const NearList = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearestRestaurants, setNearestRestaurants] = useState([]);

  useEffect(() => {
    // 打开IndexedDB数据库
    const request = indexedDB.open("MyDatabase", 1);

    request.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(["MyDataStore"], "readonly");
      const objectStore = transaction.objectStore("MyDataStore");

      // 获取所有数据
      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = function (event) {
        // 获取当前位置
        navigator.geolocation.getCurrentPosition((position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;
          setUserLocation({ lat: userLat, lon: userLon });

          // 计算并设置最近的餐饮商店
          const nearest = findNearestRestaurants(
            userLat,
            userLon,
            event.target.result
          );
          setNearestRestaurants(nearest);
        });
      };

      getAllRequest.onerror = function (event) {
        console.error("Failed to fetch data from IndexedDB:", event);
      };
    };

    request.onerror = function (event) {
      console.error("Error opening IndexedDB:", event);
    };
  }, []);

  const Row = ({ index, style }) => {
    const { FacilityType, Address, distance } = nearestRestaurants[index];
    return (
      <div style={style}>
        <div className="item_name">
          {FacilityType} - {Address}
        </div>
        <div className="item_action">距离: {distance.toFixed(2)} km</div>
      </div>
    );
  };

  return (
    <div className="near_food_ist">
      <h3>The food closest to me (total of 20)</h3>
      {nearestRestaurants.length === 0 ? (
        <p>loading...</p>
      ) : (
        <div style={{ border: "1px solid #ccc", padding: "5px" }}>
          <List height={150} itemCount={20} itemSize={60} width={600}>
            {Row}
          </List>
        </div>
      )}
    </div>
  );
};

export default NearList;
