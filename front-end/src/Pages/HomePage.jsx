import React, { useEffect } from "react";
import Products from "../Components/Products/Products";
import { contextProvider } from "../Context/Context";

const HomePage = () => {
  const { getAllPastOrders } = contextProvider();
  useEffect(() => {
    getAllPastOrders();
  }, []);
  return (
    <div>
      <Products />
    </div>
  );
};

export default HomePage;
