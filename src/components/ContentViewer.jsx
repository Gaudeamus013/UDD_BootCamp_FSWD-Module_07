import React, { useState, useEffect, useRef } from 'react';

const ContentViewer = ({ content, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentRef = useRef(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + content.length) % content.length);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      } else if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const preventContextMenu = (e) => e.preventDefault();
    const preventDragStart = (e) => e.preventDefault();

    if (contentRef.current) {
      contentRef.current.addEventListener('contextmenu', preventContextMenu);
      contentRef.current.addEventListener('dragstart', preventDragStart);
    }

    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener('contextmenu', preventContextMenu);
        contentRef.current.removeEventListener('dragstart', preventDragStart);
      }
    };
  }, [currentIndex]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="max-w-4xl w-full relative">
        <div ref={contentRef} className="select-none">
          {content[currentIndex].type === 'image' ? (
            <img 
              src={content[currentIndex].url} 
              alt="Content" 
              className="w-full h-auto"
              style={{ pointerEvents: 'none' }}
            />
          ) : (
            <video 
              src={content[currentIndex].url} 
              controls 
              className="w-full h-auto"
              style={{ pointerEvents: 'none' }}
            />
          )}
        </div>
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r"
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l"
        >
          Siguiente
        </button>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ContentViewer;