import React from "react";
import Slider from "react-slick";
const getRandomFiveUnique = (arr) => {
  if (arr.length <= 5) {
    return arr;
  }

  const result = new Set();
  while (result.size < 5) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    result.add(arr[randomIndex]);
  }

  return Array.from(result);
};
const SimpleSlider = ({ allData }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  let data = getRandomFiveUnique(allData);

  return (
    <div style={{ width: "70vw", height: "200px", border: "1px solid #000" }}>
      <Slider {...settings}>
        {data.map((item) => (
          <div style={{ height: "160px" }}>
            <h3>Today's Super Recommendation:</h3>
            <p>{item.FoodItems}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SimpleSlider;
