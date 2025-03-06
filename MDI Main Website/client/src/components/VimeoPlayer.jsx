import { useEffect, useRef } from "react";

function VimeoPlayer({ 
  url, 
  autoplay = false,
  onEnd,
  onProgressUpdate,
  startTime = 0,
  paused = false
}) {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  // Save the initial start time so that later changes do not reinitialize the player.
  const initialStartTimeRef = useRef(startTime);
  const resizeObserverRef = useRef(null);

  useEffect(() => {
    const initializePlayer = async () => {
      try {
        const { default: Vimeo } = await import("@vimeo/player");
        
        // Create the Vimeo player in the container.
        playerRef.current = new Vimeo(containerRef.current, {
          url,
          autoplay,
          byline: false,
          portrait: false,
          title: false,
          responsive: true,
        });
        
        playerRef.current.on("loaded", () => {
          // Seek to the initial start time if provided.
          if (initialStartTimeRef.current && Number(initialStartTimeRef.current) > 0) {
            playerRef.current
              .setCurrentTime(Number(initialStartTimeRef.current))
              .catch((err) => {
                console.error("Error setting start time:", err);
              });
          }
          // Delay resizing to allow container dimensions to settle.
          setTimeout(() => {
            if (playerRef.current && typeof playerRef.current.resize === "function") {
              playerRef.current.resize();
            }
          }, 1000); // increased delay (1000ms)
        });
        
        // Listen for time updates.
        playerRef.current.on("timeupdate", (data) =>
          onProgressUpdate?.({
            progressValue: data.percent,
            duration: data.duration,
          })
        );
        
        // When the video ends, trigger onEnd.
        playerRef.current.on("ended", () => onEnd?.());
        
        // Setup a ResizeObserver to watch for container size changes.
        if (window.ResizeObserver) {
          resizeObserverRef.current = new ResizeObserver(() => {
            if (playerRef.current && typeof playerRef.current.resize === "function") {
              playerRef.current.resize();
            }
          });
          if (containerRef.current) {
            resizeObserverRef.current.observe(containerRef.current);
          }
        }
      } catch (error) {
        console.error("Vimeo player initialization error:", error);
      }
    };

    initializePlayer();

    // Also attach a window resize listener.
    const handleWindowResize = () => {
      if (playerRef.current && typeof playerRef.current.resize === "function") {
        playerRef.current.resize();
      }
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      if (resizeObserverRef.current && containerRef.current) {
        resizeObserverRef.current.unobserve(containerRef.current);
      }
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [url, autoplay]); // startTime is intentionally omitted from dependencies

  // Pause the player if paused prop is true.
  useEffect(() => {
    if (playerRef.current && paused) {
      playerRef.current.pause();
    }
  }, [paused]);

  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "56.25%", // 16:9 aspect ratio
        height: 0,
        overflow: "hidden",
        width: "100%",
        minHeight: "300px", // Ensure a minimum height (adjust as needed)
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        data-vimeo-url={url}
      />
    </div>
  );
}

export default VimeoPlayer;
