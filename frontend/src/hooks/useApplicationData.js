import { useEffect, useReducer } from "react";

// Define actions for the reducer
export const ACTIONS = {
  FAV_PHOTO_TOGGLED: "FAV_PHOTO_TOGGLED",
  SET_PHOTO_SELECTED: "SET_PHOTO_SELECTED",
  CLOSE_PHOTO_DETAILS_MODAL: "CLOSE_PHOTO_DETAILS_MODAL",
  SET_PHOTO_DATA: "SET_PHOTO_DATA",
  SET_TOPIC_DATA: "SET_TOPIC_DATA",
  SET_TOPIC_PHOTOS: "SET_TOPIC_PHOTOS",
};

// Reducer function handles different actions to update the state
function reducer(state, action) {
  switch (action.type) {
    // Toggles favorite photo in the array
    case ACTIONS.FAV_PHOTO_TOGGLED:
      return {
        ...state,
        isFavoritedArr: state.isFavoritedArr.includes(action.payload.itemId)
          ? state.isFavoritedArr.filter((id) => id !== action.payload.itemId)
          : [...state.isFavoritedArr, action.payload.itemId],
      };

    // Set the selected photo for the modal
    case ACTIONS.SET_PHOTO_SELECTED:
      const selectedPhoto = action.payload.photo;
      const topicId = selectedPhoto && selectedPhoto.topic;
      const similarPhotos = topicId ? fetchPhotosByTopic(topicId) : [];

      return {
        ...state,
        isModalOpen: true,
        selectedPhoto: action.payload.photo,
        similarPhotos,
      };

    // Closes the photo details modal
    case ACTIONS.CLOSE_PHOTO_DETAILS_MODAL:
      return {
        ...state,
        isModalOpen: false,
        selectedPhoto: null,
        similarPhotos: [],
      };

    // Sets the photo data in the state
    case ACTIONS.SET_PHOTO_DATA:
      return {
        ...state,
        photoData: action.payload,
      };
    //Sets the topic data in the state
    case ACTIONS.SET_TOPIC_DATA:
      return {
        ...state,
        topicData: action.payload,
      };
    // Sets the photo data for a specific topic
    case ACTIONS.SET_TOPIC_PHOTOS:
      return {
        ...state,
        photoData: action.payload,
      };

    default:
      return state;
  }
}

//Initial state for app
const initialState = {
  isFavoritedArr: [],
  isModalOpen: false,
  selectedPhoto: null,
  similarPhotos: [],
  photoData: [],
  topicData: [],
};

//custom hook to manage state and actions
const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateToFavPhotoIds = (itemId) => {
    dispatch({ type: ACTIONS.FAV_PHOTO_TOGGLED, payload: { itemId } });
  };

  const setPhotoSelected = (photo) => {
    dispatch({ type: ACTIONS.SET_PHOTO_SELECTED, payload: { photo } });
  };

  const onClosePhotoDetailsModal = () => {
    dispatch({ type: ACTIONS.CLOSE_PHOTO_DETAILS_MODAL });
  };

  const fetchPhotosByTopic = (topicId) => {
    fetch(`/api/topics/photos/${topicId}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "SET_TOPIC_PHOTOS", payload: data });
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
      });
  };

  //fetchs photo and topic data
  useEffect(() => {
    const fetchPhotoData = fetch("/api/photos").then((response) =>
      response.json()
    );
    const fetchTopicData = fetch("/api/topics").then((response) =>
      response.json()
    );

    Promise.all([fetchPhotoData, fetchTopicData])
      .then(([photoData, topicData]) => {
        dispatch({ type: ACTIONS.SET_PHOTO_DATA, payload: photoData });
        dispatch({ type: ACTIONS.SET_TOPIC_DATA, payload: topicData });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return {
    state,
    updateToFavPhotoIds,
    setPhotoSelected,
    onClosePhotoDetailsModal,
    fetchPhotosByTopic,
  };
};

export default useApplicationData;
