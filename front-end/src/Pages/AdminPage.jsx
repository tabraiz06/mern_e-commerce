import React, { useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Products from "../Components/Products/Products";
import { contextProvider } from "../Context/Context";
import AdminProduct from "../Components/Products/AdminProduct";

const AdminPage = () => {
  const navigate = useNavigate();
  const {
    fetchAdminProducts,
    sellerId,
    sellersOrders,
    cxDetails,
    allPastOrders,
    usersId,
  } = contextProvider();
  // const {  } = contextProvider();
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
          <button className="bg-blue-200 p-[20px] py-[10px] mx-10 ">
            <Link to={`/${sellerId}/orders`}>Orders </Link>
          </button>
        </Link>
      </div>
      <AdminProduct />
    </div>
  );
};

export default AdminPage;
