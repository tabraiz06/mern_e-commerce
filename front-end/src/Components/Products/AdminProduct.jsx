import React from "react";
import { contextProvider } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const AdminProduct = () => {
  const navigate = useNavigate();
  const { adminProducts, deleteProduct, filteredProduct, fetchAllProducts } =
    contextProvider();
  const handleEditProduct = async (id) => {
    filteredProduct(id);
    navigate(`/update/${id}`);
    fetchAllProducts();
  };
  return (
    <div className="flex flex-wrap gap-10 p-[20px]">
      {adminProducts.length > 0 ? (
        adminProducts.map((ele, index) => {
          return (
            <div key={ele._id}>
              <div key={ele._id} className="max-w-[500px] overflow-hidden">
                <img
                  src={`./images/${ele.p_image}`}
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
      )}
    </div>
  );
};

export default AdminProduct;
