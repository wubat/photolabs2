import React from "react";
import "../styles/TopicListItem.scss";

const TopicListItem = ({ title, onTopicClick }) => (
  //uses onTopicClick function when topic is clicked
  <div
    className="topic-list__item"
    onClick={() => {
      onTopicClick();
    }}
  >
    <span>{title}</span>
  </div>
);

export default TopicListItem;
