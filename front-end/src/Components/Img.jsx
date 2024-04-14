import React, { useState } from "react";
import axios from "axios";

const ImageUploadComponent = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        setImage(imageData);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    try {
      const response = await axios.post("/upload-image", { image });
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  console.log(image);
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUploadComponent;
