import React, { useEffect, useRef, memo } from "react";

const BaiduMap = memo((props) => {
  const mapRef = useRef(null);
  const { Longitude, Latitude, LocationDescription } = props.locationDation;
  useEffect(() => {
    if (window.BMap) {
      const map = new window.BMap.Map(mapRef.current);
      const point = new window.BMap.Point(Longitude, Latitude);
      map.centerAndZoom(point, 15);
      // custom marker
      const marker = new BMap.Marker(point);
      map.addOverlay(marker);
      var label = new BMap.Label(LocationDescription, {
        offset: new BMap.Size(20, -10),
      });
      marker.setLabel(label);
      // add baidu tools
      map.enableScrollWheelZoom(true); // enable scroll
    } else {
      console.error("baidu map API not loader");
    }
  }, [Longitude, Latitude]);

  return (
    <div>
      <i>
        Default, the location of the first dining car in the list on the left is
        displayed:
      </i>
      <div ref={mapRef} style={{ width: "50vw", height: "90vh" }}></div>
    </div>
  );
});

export default BaiduMap;
