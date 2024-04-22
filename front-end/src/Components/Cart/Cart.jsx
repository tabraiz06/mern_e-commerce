import React from "react";
import { contextProvider } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, createNewOrder, removeCartProduct } = contextProvider();
  let totalPrice = cart.reduce((accum, ele) => (accum += ele.finalPrice), 0);

  const handleClick = () => {
    createNewOrder({
      products: cart,
      totalPrice,
    });
    cart.map((ele) => removeCartProduct(ele._id));
    navigate("/orders");
  };

  return (
    <div>
      <div className="flex items-center justify-evenly">
        <h1 className="text-3xl font-bold">Total Price = {totalPrice}</h1>{" "}
        <button
          className="bg-blue-400 px-[40px] py-[10px] rounded"
          onClick={handleClick}
        >
          Check Out
        </button>
      </div>

      {cart.map((ele) => {
        return (
          <div
            key={ele._id}
            className="flex max-h-[250px] w-full items-center justify-center gap-[40px] my-[15px]"
          >
            <div className="img">
              <img
                src={`./images/${ele.productId.p_image}`}
                alt="img"
                className="w-[150px]"
              />
            </div>
            <div className="details flex gap-16">
              <h1 className="text-3xl font-bold">{ele.productId.p_name}</h1>
              <h1 className="text-3xl font-bold">{ele.quantity}</h1>
              <h1 className="text-3xl font-bold">{ele.finalPrice}</h1>
            </div>
            <button
              onClick={() => removeCartProduct(ele._id)}
              className="bg-blue-400 px-[40px] py-[10px] rounded"
            >
              Remove item
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
