import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Products from "../Components/Products/Products";
import { contextProvider } from "../Context/Context";

const AdminPage = () => {
  const location = useLocation();
  const { fetchAdminProducts } = contextProvider();
  useEffect(() => {
    fetchAdminProducts();
  }, []);
  return (
    <div className="adminPage my-[10px] mx-[0px]">
      <div className="btn flex">
        <Link to="/add/product" className="relative right-[-70%] ">
          <button className="bg-blue-200 p-[20px] py-[10px] ">
            Add new products
          </button>
        </Link>
      </div>
      <Products />
    </div>
  );
};

export default AdminPage;
