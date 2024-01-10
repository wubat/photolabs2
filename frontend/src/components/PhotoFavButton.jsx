import React, { useCallback, useState, useEffect } from "react";
import FavIcon from "./FavIcon";
import "../styles/PhotoFavButton.scss";

function PhotoFavButton({ toggleFavoritedArr, itemId, isFavoritedArr }) {
  const inFavoritedArr = isFavoritedArr?.includes(itemId); 

  //handles click event for favorite button
  const handleClick = (event) => {
    event.preventDefault();
    toggleFavoritedArr(itemId); 
  };

  return (
    <div className="photo-list__fav-icon" onClick={handleClick}>
      <div className="photo-list__fav-icon-svg">
        <FavIcon selected={inFavoritedArr} />
      </div>
    </div>
  );
}

export default PhotoFavButton;
