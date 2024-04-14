import React, { useState } from "react";
import { contextProvider } from "../../Context/Context";
import UpdtaeProduct from "../updateProduct/UpdtaeProduct";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [quantity, setQuantity] = useState(0);
  let finalPrice = Number;

  const navigate = useNavigate();
  const {
    products,
    admin,
    adminProducts,
    deleteProduct,
    filteredProduct,
    addtoCart,
    fetchALLcarts,
  } = contextProvider();
  const [filter, setFilter] = useState(false);

  const [search, setSearch] = useState("");
  const [flterProducts, setFilterProducts] = useState([]);
  const handleChange = (e) => {
    const filter = products.filter((ele) => {
      if (ele.p_name == e.target.value) {
        return ele;
      }
    });

    setFilterProducts(filter);
  };

  const handleEditProduct = async (id) => {
    await filteredProduct(id);
    navigate(`/update/${id}`);
  };

  const handleCart = (id, price) => {
    if (quantity === 0) {
      alert("add quantity");
    } else {
      price = quantity * price;
      let cart = {
        productId: id,
        finalPrice: price,

        quantity,
      };
      addtoCart(cart);
      fetchALLcarts();
    }
  };

  return (
    <div>
      <div>
        {filter && <UpdtaeProduct />}
        <input
          type="text"
          name="search"
          id="search"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="flex flex-wrap gap-5 items-center justify-center">
        {admin ? (
          adminProducts.length > 0 ? (
            adminProducts.map((ele, index) => {
              return (
                <div key={ele._id}>
                  <div key={ele._id} className="max-w-[500px] overflow-hidden">
                    <img
                      src={ele.p_image}
                      alt="product image"
                      className="rounded-2xl h-[300px] w-full"
                    />
                    <h1 className=" font-bold text-2xl">{ele.p_name}</h1>
                    <p className="text-lg">{ele.p_discription}</p>
                    <div className="flex justify-between">
                      <label
                        htmlFor="quantity"
                        className="text-xl font-semibold"
                      ></label>
                      {/* <input type="number" className="w-[50px]" /> */}
                      <h2 className="font-bold text-2xl">
                        Price: {ele.p_price}/RS
                      </h2>
                    </div>

                    <div className="flex justify-between gap-5">
                      <button
                        onClick={() => handleEditProduct(ele._id)}
                        className=" font-bold text-2xl bg-blue-800 px-[20px] py-[10px] rounded"
                      >
                        Edit Product
                      </button>
                      <button
                        className=" font-bold text-2xl bg-blue-800 px-[20px] py-[10px] rounded"
                        onClick={() => deleteProduct(ele._id)}
                      >
                        Remove Product
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div className="flex min-h-[500px] items-center justify-center  ">
                <h1 className="font-bold text-3xl">
                  you dont have any product yet
                </h1>
              </div>
            </>
          )
        ) : (
          <>
            {products.map((ele, index) => {
              return (
                <div key={ele._id}>
                  <div key={ele._id} className="max-w-[500px] overflow-hidden">
                    <img
                      src={ele.p_image}
                      alt="product image"
                      className="rounded-2xl h-[300px] w-full"
                    />
                    <h1 className=" font-bold text-2xl">{ele.p_name}</h1>
                    <p className="text-lg">{ele.p_discription}</p>
                    <div className="flex justify-between">
                      <label
                        htmlFor="quantity"
                        className="text-xl font-semibold"
                      >
                        qtn
                      </label>
                      <input
                        type="number"
                        className="w-[50px]"
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      <h2 className="font-bold text-2xl">
                        Price: {ele.p_price}/RS <br />
                        <span className="text-sm font-normal">
                          final price: {quantity * ele.p_price}
                        </span>
                      </h2>
                    </div>

                    <div className="flex justify-between">
                      <button className=" font-bold text-2xl bg-blue-800 px-[20px] py-[10px] rounded">
                        view
                      </button>
                      <button
                        className=" font-bold text-2xl bg-blue-800 px-[20px] py-[10px] rounded"
                        onClick={() => handleCart(ele._id, ele.p_price)}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
