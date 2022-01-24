import React from "react";

const DeliveryFoodCategory = () => {
  return(
    <>
      <div className = "bg-white rounded-md shadow">
        <div className = "w-40 h-40">
          <img
            src = "https://b.zmtcdn.com/data/pictures/chains/5/61555/9f2f843523d0e8b9ecd9ee9ee32c1c46_o2_featured_v2.jpg"
            alt = "Burger"
            className = "w-full h-full"
          />
        </div>
        <div>
          <h3 className = "my-2 text-base font-medium font-light mx-4" >Burger</h3>
        </div>
      </div>
    </>
  );
};

export default DeliveryFoodCategory;
