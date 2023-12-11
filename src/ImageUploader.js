import React, { useState } from 'react';
import './ImageUploader.css'; // Make sure to create this CSS file

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));
      setUploading(true);
      // Simulate an upload progress
      setTimeout(() => {
        setUploading(false);
      }, 2000);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <input type="file" id="file" className="upload-input" onChange={onImageChange} />
        <label htmlFor="file" className="upload-label">
          Drag and drop or <span>browse</span> your files
        </label>
        {uploading && <div className="uploading-info">Uploading... </div>}
        {image && !uploading && <div className="image-preview">
          <img src={image} alt="Uploaded" />
        </div>}
      </div>
      <button className="upload-done-button">DONE</button>
    </div>
  );
}

export default ImageUploader;
