import React, { useEffect } from "react";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
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
const SimpleSlider = ({ deliciouDatas }) => {
  useEffect(() => {}, []);
  let data = getRandomFiveUnique(deliciouDatas);

  return (
    <div style={{ width: "70vw", height: "200px", border: "1px solid #000" }}>
      {data.length > 0 ? (
        <Slider {...settings}>
          {data.map((item) => (
            <div style={{ height: "160px" }} key={item.Location}>
              <h3>Today's Super Recommendation:</h3>
              <p>{item.FoodItems}</p>
            </div>
          ))}
        </Slider>
      ) : (
        <p>delicious is loading</p>
      )}
    </div>
  );
};

export default SimpleSlider;
