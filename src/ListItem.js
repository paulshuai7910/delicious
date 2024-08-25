import React, { memo } from "react";

const ListItem = memo(({ item, handleLocalInMap }) => {
  return (
    <div className="list_item" key={item.id}>
      <div className="item_name">
        {item.FacilityType + ": " + item.FoodItems}
      </div>
      <div className="item_action">
        <div
          className="btn"
          onClick={() => {
            handleLocalInMap(item);
          }}
        >
          position
        </div>
      </div>
    </div>
  );
});

export default ListItem;
