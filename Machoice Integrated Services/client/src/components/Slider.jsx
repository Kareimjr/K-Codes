import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

const Slider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [gifReload, setGifReload] = useState(null);
  const videoRefs = useRef([]); // Array of refs for all videos
  const [isMuted, setIsMuted] = useState(true); // Only for UI, starts muted

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Auto-advance for images/GIFs after 5 seconds.
  useEffect(() => {
    let timer;
    if (slides[currentSlide].type !== 'video') {
      timer = setTimeout(() => {
        handleNext();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [currentSlide, slides]);

  // Force GIF reload by appending a unique query param.
  useEffect(() => {
    if (slides[currentSlide].type === 'gif') {
      setGifReload(Date.now());
    }
  }, [currentSlide, slides]);

  // Manage all videos: pause non-active videos and ensure only current video plays muted
  useEffect(() => {
    // Pause and mute all videos that are not current
    videoRefs.current.forEach((ref, index) => {
      if (ref && index !== currentSlide) {
        if (ref.pause) ref.pause(); // Pause if playing
        if (ref.muted !== undefined) ref.muted = true; // Ensure muted
        if (ref.currentTime) ref.currentTime = 0; // Reset time
      }
    });

    // Play and mute current video if it’s a video slide
    if (slides[currentSlide].type === 'video' && videoRefs.current[currentSlide]) {
      const currentVideo = videoRefs.current[currentSlide];
      currentVideo.muted = true; // Ensure muted
      currentVideo.currentTime = 0; // Restart from beginning
      currentVideo.play().catch(error => console.error("Video play failed:", error)); // Play with error handling
    }
  }, [currentSlide, slides]);

  // Calculate aspect ratio of the video (848:480)
  const videoAspectRatio = 848 / 480; // Width / Height

  // Dynamically set the container size based on the window width
  useEffect(() => {
    const updateSize = () => {
      const slider = document.querySelector('.slider-container');
      if (slider) {
        const windowWidth = window.innerWidth;
        const newHeight = windowWidth / videoAspectRatio;
        slider.style.height = `${newHeight}px`;
      }
    };
    window.addEventListener('resize', updateSize);
    updateSize(); // Initial call
    return () => window.removeEventListener('resize', updateSize);
  }, [videoAspectRatio]);

  // Toggle mute directly on the current video element
  const handleMuteToggle = () => {
    if (slides[currentSlide].type === 'video' && videoRefs.current[currentSlide]) {
      const currentVideo = videoRefs.current[currentSlide];
      const newMutedState = !currentVideo.muted;
      currentVideo.muted = newMutedState;
      setIsMuted(newMutedState); // Update UI state
    }
  };

  return (
    <div className="relative w-full slider-container overflow-hidden">
      <div
        className="w-full h-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative">
            {slide.type === 'video' ? (
              <div className="w-full h-full md:h-[700px] relative">
                <video
                  ref={el => videoRefs.current[index] = el} // Assign ref to array
                  src={slide.src}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  autoPlay={index === currentSlide} // Only autoplay current slide
                  playsInline
                  onEnded={index === currentSlide ? handleNext : undefined} // Only trigger onEnded for current slide
                  onLoadedMetadata={(e) => {
                    if (index !== currentSlide && e.target) {
                      e.target.pause(); // Pause non-current videos
                      e.target.muted = true; // Mute non-current videos
                      e.target.currentTime = 0; // Reset non-current videos
                    }
                  }}
                />
                {index === currentSlide && ( // Only show mute button for current slide
                  <button
                    onClick={handleMuteToggle}
                    className="absolute top-4 right-4 bg-white/70 hover:bg-white/90 p-2 rounded-full shadow-md transition"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-gray-800" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-gray-800" />
                    )}
                  </button>
                )}
              </div>
            ) : (
              <img
                src={
                  slide.type === 'gif' && index === currentSlide && gifReload
                    ? `${slide.src}?t=${gifReload}`
                    : slide.src
                }
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
            )}
            {slide.title && index === currentSlide && ( // Only show title for current slide
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="text-center text-white max-w-2xl px-4">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl">{slide.description}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons Overlay */}
      <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex items-center justify-between px-2 sm:px-4">
        <button
          onClick={handlePrev}
          className="bg-white/30 hover:bg-white/50 p-1 sm:p-2 rounded-full shadow-md transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="bg-white/30 hover:bg-white/50 p-1 sm:p-2 rounded-full shadow-md transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Slider;