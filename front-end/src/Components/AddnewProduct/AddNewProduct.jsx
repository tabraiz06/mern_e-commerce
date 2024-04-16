import React, { useState } from "react";
import { contextProvider } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const AddNewProduct = () => {
  const { sellerId, addNewProduct } = contextProvider();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const initials = {
    p_catagery: "",
    p_name: "",
    p_discription: "",

    p_price: 0,
    sellerId: sellerId,
  };

  const [addproduct, setAddproduct] = useState(initials);
  const handleImageChange = async (e) => {
    await setImage(e.target.files[0]);
    console.log(image);
  };

  const handleChange = (event) => {
    setAddproduct({ ...addproduct, [event.target.name]: event.target.value });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("p_catagery", addproduct.p_catagery);
    formData.append("p_name", addproduct.p_name);
    formData.append("p_discription", addproduct.p_discription);
    formData.append("p_price", addproduct.p_price);
    formData.append("sellerId", sellerId);
    formData.append("p_image", image);
    addNewProduct(formData);
    navigate("/admin");
  };
  // p_catagery, p_name, p_discription, p_image, p_price, sellerId;

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
              value={addproduct.sellerId}
            />
            <button onClick={(e) => handleClick(e)}>ADD</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
