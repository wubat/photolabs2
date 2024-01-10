import React from "react";
import "../styles/TopNavigationBar.scss";
import FavBadge from "./FavBadge";
import TopicList from "./TopicList";

const TopNavigation = ({ topicData, isFavoritedArr, fetchPhotosByTopic }) => {
  //check if there are already favorited phtos
  const isFavPhotoExist = isFavoritedArr.length > 0 ? true : false;

  const selected = isFavoritedArr.length > 0 ? true : false;

  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo">PhotoLabs</span>
      <TopicList
        topicData={topicData}
        fetchPhotosByTopic={fetchPhotosByTopic}
      />
      <FavBadge isFavPhotoExist={isFavPhotoExist} selected={selected} />
    </div>
  );
};

export default TopNavigation;
