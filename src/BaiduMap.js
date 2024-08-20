import React, { useEffect, useRef } from "react";

const BaiduMap = (props) => {
  const mapRef = useRef(null);
  console.log("pppppp", props);
  const { longitude, latitude } = props;
  useEffect(() => {
    if (window.BMap) {
      const map = new window.BMap.Map(mapRef.current);
      const point = new window.BMap.Point(longitude, latitude);
      map.centerAndZoom(point, 15);

      // add baidu tools
      map.enableScrollWheelZoom(true); // enable scroll
    } else {
      console.error("baidu map API not loader");
    }
  }, [longitude, latitude]);

  return <div ref={mapRef} style={{ width: "50vw", height: "400px" }}></div>;
};

export default BaiduMap;
