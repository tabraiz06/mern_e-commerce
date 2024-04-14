import React, { useEffect, useState } from "react";
import { contextProvider } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const UpdtaeProduct = () => {
  const navigate = useNavigate();
  const { filterproduct, sellerId, fetchAdminProducts } = contextProvider();

  const { _id, p_name, p_catagery, p_discription, p_image, p_price } =
    filterproduct;

  const [image, setImage] = useState(p_image);

  const initials = {
    p_catagery: "",
    p_name: "",
    p_discription: "",
    p_image: p_image,
    p_price: 0,
    sellerId: "",
  };

  const [addproduct, setAddproduct] = useState({
    p_catagery: p_catagery,
    p_name: p_name,
    p_discription: p_discription,
    p_image: p_image,
    p_price: p_price,
    sellerId: sellerId,
  });
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        const imageData = reader.result;

        setImage(imageData);
        // setAddproduct({addproduct.p_image: imageData});
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const handleChange = (event) => {
    setAddproduct({ ...addproduct, [event.target.name]: event.target.value });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/products/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        p_catagery: addproduct.p_catagery,
        p_name: addproduct.p_name,
        p_discription: addproduct.p_discription,

        p_price: addproduct.p_price,
        sellerId: sellerId,
        p_image: image,
      }),
    });
    const result = await response.json();

    if (response.ok) {
      fetchAdminProducts();
      navigate("/admin");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] my-[40px] w-full  gap-11">
      <div>
        <h1 className="font-bold text-3xl">Add new Products</h1>
      </div>
      <div className="flex w-full">
        <div className="output min-w-[50%] flex">
          <div className="img w-[50%]">
            <img src={image} alt="" className="w-full" />
          </div>
          <div className="flex flex-col side w-[50%] gap-5">
            <h1 className="font-bold text-2xl">Product name</h1>
            <h1 className="font-bold text-2xl">{addproduct.p_name}</h1>
            <h1 className="font-bold text-2xl">Prodcut Catagery</h1>
            <h1 className="font-bold text-2xl">{addproduct.p_catagery}</h1>
            <p className="font-bold text-2xl">Product discription</p>
            <p className=" text-2xl">{addproduct.p_discription}</p>
            <h1 className="font-bold text-2xl">Product Price</h1>
            <h1 className="font-bold text-2xl">{addproduct.p_price}</h1>
            <h1 className="font-bold text-2xl">Seller id</h1>
            <h1 className="font-bold text-2xl">{addproduct.sellerId}</h1>
          </div>
        </div>
        <div className="input min-w-[50%]">
          <form className="w-[70%] static">
            <h1 className="font-bold text-2xl">your sellerId: {sellerId}</h1>
            <label htmlFor="p_catagery">Product Catagery</label>
            <input
              onChange={handleChange}
              className="rounded px-[20px] py-[10px] w-full"
              type="text"
              name="p_catagery"
              placeholder="Product Catagery"
            />
            <label htmlFor="p_name">Product Name</label>
            <input
              onChange={handleChange}
              className="rounded px-[20px] py-[10px]  w-full"
              type="text"
              name="p_name"
              placeholder="Product Name"
            />
            <label htmlFor="p_discription">Product discription</label>
            <input
              onChange={handleChange}
              className="rounded px-[20px] py-[10px]  w-full"
              type="text"
              name="p_discription"
              placeholder="Product discription"
            />
            <label htmlFor="p_image">upload image</label>
            <input
              onChange={handleImageChange}
              className="rounded px-[20px] py-[10px]  w-full"
              accept="image/*"
              type="file"
              name="p_image"
              placeholder="upload image"
            />
            <label htmlFor="p_price">Price</label>
            <input
              onChange={handleChange}
              className="rounded px-[20px] py-[10px] w-full"
              type="number"
              name="p_price"
              placeholder="Price"
            />
            <label htmlFor="sellerId">Seller id</label>
            <input
              onChange={handleChange}
              className="rounded px-[20px] py-[10px] w-full"
              type="text"
              name="sellerId"
              placeholder="sellerId"
              value={sellerId}
              //   value={sellerId}
            />
            <button onClick={(e) => handleClick(e)}>update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdtaeProduct;
