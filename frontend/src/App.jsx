import React from "react";
import "./App.scss";
import HomeRoute from "routes/HomeRoute";
import useApplicationData from "hooks/useApplicationData";

const App = () => {
  const { state, fetchPhotosByTopic, setPhotoSelected } = useApplicationData();

  const handlePhotoClick = (photo) => {
    // Set the clicked photo as the selected photo to open the modal
    setPhotoSelected(photo);
  };

  return (
    <div className="App">
      <HomeRoute
        photoData={state.photoData}
        topicData={state.topicData}
        fetchPhotosByTopic={fetchPhotosByTopic}
        onPhotoClick={handlePhotoClick}
      />
    </div>
  );
};

export default App;
