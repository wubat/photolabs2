import React from "react";
import "../styles/TopicList.scss";
import TopicListItem from "./TopicListItem";

const TopicList = ({ topicData, fetchPhotosByTopic }) => {
  return (
    <div className="top-nav-bar__topic-list">
      {topicData.map((topic) => (
        //creates onTopicClick function to register click
        <TopicListItem
          key={topic.id}
          {...topic}
          onTopicClick={() => fetchPhotosByTopic(topic.id)}
        />
      ))}
    </div>
  );
};

export default TopicList;
