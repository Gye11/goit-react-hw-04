import { useState } from "react";
import { fetchImages } from "./services/api";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

import { Toaster } from "react-hot-toast";

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleSearch = async (newQuery) => {
    try {
      setLoading(true);
      setError(false);

      setQuery(newQuery);
      setPage(1);

      const data = await fetchImages(newQuery, 1);
      setImages(data.results);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);

      const nextPage = page + 1;
      const data = await fetchImages(query, nextPage);

      setImages((prev) => [...prev, ...data.results]);
      setPage(nextPage);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage />}

      <ImageGallery images={images} openModal={openModal} />

      {loading && <Loader />}

      {images.length > 0 && <LoadMoreBtn onClick={loadMore} />}

      <ImageModal
        isOpen={modalOpen}
        onClose={closeModal}
        image={selectedImage}
      />

      <Toaster />
    </>
  );
}
