import React, { useState } from "react";
import { contextProvider } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const ViewProduct = () => {
  const navigate = useNavigate();
  const { viewSingleProduct, createNewOrder, getAllPastOrders } =
    contextProvider();
  const [quantity, setQuantity] = useState(0);
  let totalPrice = quantity * viewSingleProduct.p_price;
  const handleClick = () => {
    if (quantity === 0) {
      alert("please select minimum 1 quantity");
    } else {
      createNewOrder({
        products: [
          { productId: viewSingleProduct, quantity, finalPrice: totalPrice },
        ],
        totalPrice,
      });
      getAllPastOrders();
      navigate("/orders");
    }
  };

  return (
    <div className="flex  justify-evenly">
      <div className="img">
        <img
          className="h-[100vh] w-[80%]"
          src={viewSingleProduct.p_image}
          alt="p image"
        />
      </div>
      <div className="flex flex-col gap-[1.5rem] p-[60px] w-[50%]">
        <h1 className="font-bold text-3xl">
          Product Name : {viewSingleProduct.p_name}
        </h1>
        <h1 className="font-bold text-2xl">
          Catagery :{viewSingleProduct.p_catagery}
        </h1>
        <h1 className="font-medium text-3xl">
          Description : <br />
          <span className="font-normal text-2xl">
            {viewSingleProduct.p_discription}
          </span>
        </h1>
        <div>
          <div className="flex ">
            <h3 className="font-medium text-2xl">Quantity</h3>
            <input
              type="number"
              className="border-black border w-[50px] mx-24"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <h2 className="font-bold text-3xl">
            Product Price :{viewSingleProduct.p_price}
          </h2>
          <h2 className="font-bold text-3xl">
            Final Price :{quantity * viewSingleProduct.p_price}
          </h2>
        </div>
        <div className="btn p-[20px] flex self-end h-[150px] my-0 mx-auto">
          <button
            className="bg-blue-400 px-[20px] py-[10px] h-[60px] rounded font-bold"
            onClick={handleClick}
          >
            Order now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
