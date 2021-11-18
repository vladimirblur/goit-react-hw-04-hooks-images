import { useState, useEffect } from "react";

import scrollToNewImages from "./components/services/scrollToNewImages";
import fetchImages from "./components/services/imagesApi";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import ImageGalleryItem from "./components/ImageGalleryItem";
import Loader from "react-loader-spinner";
import Button from "./components/Button";
import Modal from "./components/Modal";
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    fetchImages(searchQuery, page)
      .then((images) => {
        setStatus(Status.PENDING);

        if (page > 1) {
          setImages((prevImages) => [...prevImages, ...images]);
          setStatus(Status.RESOLVED);

          scrollToNewImages();
          return;
        }

        setImages([...images]);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        console.error(error.message);
        setStatus(Status.REJECTED);
      });
  }, [searchQuery, page]);

  const handleSearchSubmit = (searchQuery) => {
    setSearchQuery(searchQuery);
  };

  const handleClickImage = (e) => {
    setCurrentImage(e.target.dataset.modal);
    setShowModal((hidden) => !hidden);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      <Loader
        type="Bars"
        color="#00BFFF"
        height={80}
        width={80}
        visible={status === Status.PENDING}
      />
      {status === Status.RESOLVED && (
        <ImageGallery>
          <ImageGalleryItem images={images} onClick={handleClickImage} />
        </ImageGallery>
      )}
      {images.length > 0 && (
        <Button onLoadMore={() => setPage((page) => page + 1)} />
      )}
      {showModal && <Modal imgSrc={currentImage} onCloseModal={setShowModal} />}
    </div>
  );
}

export default App;
