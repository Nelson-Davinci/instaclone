import { useState, useCallback } from "react";

export default function useSlideControl(arrayPhotos) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevious = useCallback(() => {
    setCurrentImageIndex(
      (prev) => prev - 1 + (arrayPhotos?.length % arrayPhotos?.length)
    );
  }, [arrayPhotos?.length]);

  const handleNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % arrayPhotos?.length);
  }, [arrayPhotos?.length]);

  return {
    currentImageIndex,
    setCurrentImageIndex,
    handlePrevious,
    handleNext,
  };
}
