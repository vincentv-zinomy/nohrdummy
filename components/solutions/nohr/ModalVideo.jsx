import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export const ModalVideo = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady } = props;

  const [openModal, setOpenModal] = useState(false);

  const closeModal = useCallback(() => {
    setOpenModal(false);
    playerRef.current.pause();
  }, []);

  const modalOverlayClasses = useMemo(
    () =>
      `fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-black/30 transition-all w-screen h-screen ${
        openModal ? 'block opacity-1' : 'hidden opacity-0'
      }`,
    [openModal]
  );

  const videoPlayerClasses = useMemo(
    () => `${openModal ? 'w-[800px] opacity-1 block' : 'w-0 opacity-0 hidden'}`,
    [openModal]
  );

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement('video');
      videoElement.classList.add('video-js');
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log('player is ready');
        onReady && onReady(player);
      }));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }

    // Play or pause video based on the value of openModal
    if (openModal) {
      playerRef.current.play();
    } else {
      closeModal();
    }
  }, [options, onReady, openModal, closeModal]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="w-fit mx-auto lg:mx-0 flex items-center space-x-2.5 text-brand-green font-semibold rounded-lg border border-brand-green transition duration-200 px-6 py-2.5 md:py-3.5 md:px-9 mt-6 md:mt-9"
      >
        Watch Demo
      </button>

      <div className={modalOverlayClasses} onClick={closeModal}></div>
      <div data-vjs-player className="fixed z-20 top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">
        <div ref={videoRef} className={videoPlayerClasses} />
      </div>
    </>
  );
};

export default ModalVideo;
