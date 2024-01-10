import React, { useEffect } from "react";
import "../styles/PhotoDetailsModal.scss";
import closeSymbol from "../assets/closeSymbol.svg";
import PhotoList from "components/PhotoList";
import PhotoFavButton from "components/PhotoFavButton";

const PhotoDetailsModal = (props) => {
  const {
    isOpen,
    onClose,
    selectedPhoto,
    toggleFavoritedArr,
    photoData,
    fetchPhotosByTopic,
    onPhotoClick,
    isFavoritedArr,
  } = props;

  // Uses useEffect to fetch similar photosss when selectedPhoto changes
  useEffect(() => {
    if (selectedPhoto && selectedPhoto.topic) {
      fetchPhotosByTopic(selectedPhoto.topic);
    }
  }, [selectedPhoto, fetchPhotosByTopic]);

  //if the modal is not open or  no photo selected render null
  if (!isOpen || !selectedPhoto) {
    return null;
  }

  return (
    <div className="photo-details-modal">
      <div className="photo-details-modal__top-bar">
        <button className="photo-details-modal__close-button" onClick={onClose}>
          <img src={closeSymbol} alt="close symbol" />
        </button>
      </div>

      <div className="photo-details-modal__images">
        <PhotoFavButton
          toggleFavoritedArr={toggleFavoritedArr}
          itemId={selectedPhoto.id}
          isFavoritedArr={isFavoritedArr}
        />
        <img
          className="photo-details-modal__image"
          src={selectedPhoto.urls.regular}
          alt={`Photo by ${selectedPhoto.user.name}`}
        />
      </div>
      <div className="photo-details-modal__photographer-details">
        <img
          className="photo-details-modal__photographer-profile"
          src={selectedPhoto.user.profile}
          alt={`${selectedPhoto.user.name}'s profile`}
        />
        <div className="photo-details-modal__photographer-info">
          {`${selectedPhoto.user.name}`}
          <p className="photo-details-modal__photographer-location">
            {`${selectedPhoto.location.city}, ${selectedPhoto.location.country}`}
          </p>
        </div>
      </div>

      <h2 className="photo-details-modal__header">Similar Photos</h2>

      <PhotoList
        photoData={photoData.filter(
          (photo) => photo.topic === selectedPhoto.topic
        )}
        toggleFavoritedArr={toggleFavoritedArr}
        itemId={selectedPhoto.id}
        onPhotoClick={onPhotoClick}
        isFavoritedArr={isFavoritedArr}
      />
    </div>
  );
};

export default PhotoDetailsModal;
