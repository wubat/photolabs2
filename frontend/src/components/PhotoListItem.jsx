import React from "react";
import "../styles/PhotoListItem.scss";
import PhotoFavButton from "./PhotoFavButton";

const PhotoListItem = (props) => {
  const {
    itemId,
    location,
    imageSource,
    username,
    profile,
    toggleFavoritedArr,
    onClick,
    isFavoritedArr,
  } = props;

  return (
    <div className="photo-list__item">
      <PhotoFavButton
        toggleFavoritedArr={toggleFavoritedArr}
        itemId={itemId}
        isFavoritedArr={isFavoritedArr}
      />

      <img
        className="photo-list__image"
        onClick={onClick}
        src={imageSource}
        alt={`Photo by ${username}`}
      />
      <div className="photo-list__user-info">
        <img
          className="photo-list__user-profile"
          src={profile}
          alt={`${username}'s profile`}
        />
        <div className="photo-list__user-details">
          <p className="photo-list__user-name">{username}</p>
          <p className="photo-list__user-location">{`${location.city}, ${location.country}`}</p>
        </div>
      </div>
    </div>
  );
};

export default PhotoListItem;
