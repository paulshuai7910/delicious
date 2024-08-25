import React from "react";
import PaginatedList from "./PaginatedList";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimpleSlider from "./Slick";

const DeliciousComponent = () => {
  return (
    <div className="delicious_container">
      {/* <SimpleSlider /> */}
      <PaginatedList />
    </div>
  );
};

export default DeliciousComponent;
