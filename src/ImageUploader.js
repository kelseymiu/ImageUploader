import React, { useState } from 'react';
import './ImageUploader.css'; // Make sure to create this CSS file

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [segment, setSegment] = useState(null); // segment image
  const [imageName, setImageName] = useState('');

  const [uploading, setUploading] = useState(false);

  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      // validate png 
      let ext = img.name.split('.').pop();
      if (ext !== 'png') {
        alert('Only PNG files are allowed');
        return;
      }
      setImageName(img.name);
      setImage(URL.createObjectURL(img));
      setUploading(true);
      // Simulate an upload progress
      setTimeout(() => {
        setUploading(false);
        setSegment('');
      }, 500);
    }
  };

  const onImageSubmit = () => {
    console.log('onImageSubmit')
    if (!image) {
      alert('Please upload an image');
      return;
    }

    // Simulate an upload progress
    let src = '/images/raws/' + imageName.split('.')[0].split('_')[0] + '_pred.png';
    
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setSegment(src);
    }, 2000);
    

  };
  return (
    <div className="upload-container">
      <h1>Upload an Image</h1>
      <div className="upload-box">
        <input type="file" id="file" className="upload-input" onChange={onImageChange} />
        <label htmlFor="file" className="upload-label">
          Drag and drop or <span>browse</span> your files
        </label>
        {
          image && <label>Uploaded Image: {imageName}</label>
        }
        {uploading && <div className="uploading-info">Loading... </div>}
        {image && !segment && !uploading && <div className="image-preview">
          <img src={image} alt="Uploaded" />
        </div>}
        {image && segment && !uploading && <div className="image-preview">
          <img src={image} alt="Uploaded" />
          <img style={{marginLeft:25}} src={segment} alt="Segmented" />
        </div>}
      </div>
      <button className="upload-done-button" onClick={() => onImageSubmit()}>DONE</button>
    </div>
  );
}

export default ImageUploader;
