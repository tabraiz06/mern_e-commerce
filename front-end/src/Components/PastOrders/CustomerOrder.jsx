import React, { useEffect } from "react";
import { contextProvider } from "../../Context/Context";

const CustomerOrder = () => {
  const { sellerId, sellersOrders, cxDetails, allPastOrders, usersId } =
    contextProvider();

  return (
    <div className="flex h-screen w-full justify-center p-12">
      {sellersOrders.length === 0 ? (
        <>
          <div className="font-bold text-center text-2xl">
            Loading data or do not have any orders yet
          </div>
        </>
      ) : (
        <>
          <table className="w-2/3 min-h-[250px] border text-center ">
            <thead className="text-2xl">
              <tr className="border">
                <th className="border">Customer Id</th>
                <th className="border">Product Name</th>
                <th className="border">Product price</th>
                <th className="border">Quantity</th>
                <th className="border">Total Amount</th>
                <th className="border">Product id</th>
              </tr>
            </thead>
            <tbody className="text-xl">
              {sellersOrders.map((ele) => {
                return (
                  <tr key={ele._id} className="border">
                    <td className="border">{ele.userId}</td>
                    <td className="border">{ele.productId.p_name}</td>
                    <td className="border">{ele.productId.p_price}</td>
                    <td className="border">{ele.quantity}</td>
                    <td className="border">{ele.finalPrice}</td>
                    <td className="border">{ele.productId._id}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CustomerOrder;
