import React, { useEffect, useState } from "react";
import { contextProvider } from "../../Context/Context";
import { useLocation } from "react-router-dom";

const PastOrders = () => {
  const location = useLocation();
  const { sellerId, pastOrders, getAllPastOrders, allPastOrders } =
    contextProvider();

  //   let products = [];
  useEffect(() => {
    getAllPastOrders();
  }, []);

  return (
    <div className="flex flex-col my-14 items-center justify-center w-full">
      <h1 className="font-bold text-center text-4xl">your past orders</h1>
      {pastOrders.length === 0 ? (
        <>
          <div className="font-bold text-center text-2xl">
            Loading data or do not have any orders yet
          </div>
        </>
      ) : (
        <>
          <table className="text-center text-2xl w-[70%]">
            <thead>
              <tr>
                <th>Product Name</th>

                <th> Product Price</th>
                <th>Quantity</th>
                <th>Final Price</th>
              </tr>
            </thead>
            <tbody>
              {pastOrders.map((ele) => {
                return (
                  <>
                    {ele.products.map((ele, index) => {
                      return (
                        <tr key={index}>
                          <td>{ele.productId.p_name}</td>
                          <td>{ele.productId.p_price}</td>
                          <td>{ele.quantity}</td>
                          <td>{ele.finalPrice}</td>
                        </tr>
                      );
                    })}
                  </>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default PastOrders;
