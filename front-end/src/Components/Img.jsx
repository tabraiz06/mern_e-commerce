import React, { useState } from "react";
import axios from "axios";

const ImageUploadComponent = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
  };
  console.log(image);

  const handleUpload = async () => {
    const formdata = new FormData();
    formdata.append("image", image);
    try {
      const response = await fetch("http://localhost:5000/api/image", {
        method: "POST",

        body: formdata,
      });
      console.log("Image uploaded successfully:", response);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        name="image"
      />
      <button onClick={handleUpload}>Upload Image</button>
      <img src={image} />
    </div>
  );
};

export default ImageUploadComponent;
