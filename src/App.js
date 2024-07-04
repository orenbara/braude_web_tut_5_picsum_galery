import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    // Fetch images from Picsum
    fetch("https://picsum.photos/v2/list?page=1&limit=10")
      .then((response) => response.json())
      .then((data) => setImages(data));
  }, []);

  const handleNext = () => {
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="App">
      <h1>Picsum Gallery</h1>
      <div className="image-gallery">
        {images.map((image, index) => (
          <img
            key={image.id}
            src={image.download_url}
            alt={image.author}
            className="thumbnail"
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>
      {images.length > 0 && (
        <div className="image-viewer">
          <button onClick={handlePrevious}>Previous</button>
          <img
            src={images[selectedIndex].download_url}
            alt={images[selectedIndex].author}
            className="large-image"
          />
          <button onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
}

export default App;
