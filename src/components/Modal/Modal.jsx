import { useEffect } from 'react';
import { ModalDiv, ImageModalDiv } from './Modal.styled';

export const Modal = ({ largeImageURL, isOpen, onClose }) => {
  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    isOpen && (
      <ModalDiv className="overlay" onClick={handleOverlayClick}>
        <ImageModalDiv className="modal">
          <img src={largeImageURL} alt="" />
        </ImageModalDiv>
      </ModalDiv>
    )
  );
};
