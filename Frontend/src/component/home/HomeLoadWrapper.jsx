// HomeLoaderWrapper.jsx
import React, { useEffect, useRef, useState } from 'react';
import Home from './Home';

const HomeLoaderWrapper = () => {
  const wrapperRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const images = wrapper?.querySelectorAll('img') || [];
    let loadedCount = 0;

    if (images.length === 0) {
      setLoaded(true);
      return;
    }

    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
        if (loadedCount === images.length) {
          setLoaded(true);
        }
      } else {
        img.onload = img.onerror = () => {
          loadedCount++;
          if (loadedCount === images.length) {
            setLoaded(true);
          }
        };
      }
    });
  }, []);

  return (
    <>
      {!loaded && <div className="text-center py-10">Loading Home...</div>}
      <div ref={wrapperRef} style={{ display: loaded ? 'block' : 'none' }}>
        <Home />
      </div>
    </>
  );
};

export default HomeLoaderWrapper;
