import { useState, useEffect } from 'react';
import { fetchData } from './api';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import toast, { Toaster } from 'react-hot-toast';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Wrapper } from './App.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        if (!query) {
          return;
        }

        setLoading(true);

        const fetchedImages = await fetchData(query, page);
        const { hits, totalHits } = fetchedImages;

        if (hits.length === 0) {
          toast('No images found.');
          return;
        }

        setImages(prevImages => [...prevImages, ...hits]);
        setLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error! Something went wrong!');
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, [page, query]);

  const handleSearch = newQuery => {
    if (newQuery === query) {
      toast.error('Already showing results for the same query.');
      return;
    }

    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleImageClick = largeImageURL => {
    setCurrentImage(largeImageURL);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Wrapper className="App">
      <SearchBar onSubmit={handleSearch} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {loadMore && <Button onClick={handleLoadMore} />}
      {isModalOpen && (
        <Modal
          largeImageURL={currentImage}
          onClose={handleCloseModal}
          isOpen={isModalOpen}
        />
      )}
      <Toaster />
    </Wrapper>
  );
};
