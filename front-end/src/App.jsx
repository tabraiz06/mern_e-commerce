import { useState } from "react";
import FileUploadComponent from "./Components/Img";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIN from "./Pages/SigninPage";
import NavBar from "./Components/NavBar/NavBar";
import "./App.css";
import HomePage from "./Pages/HomePage";
import AdminPage from "./Pages/AdminPage";
import AddNewProduct from "./Components/AddnewProduct/AddNewProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdtaeProduct from "./Components/updateProduct/UpdtaeProduct";
import CartPage from "./Pages/CartPage";
import PastOrders from "./Components/PastOrders/PastOrders";
import ViewProduct from "./Components/ViewProduct/ViewProduct";
import ImageUploadComponent from "./Components/Img";
import { contextProvider } from "./Context/Context";
import CustomerOrder from "./Components/PastOrders/CustomerOrder";

function App() {
  const { sellerId } = contextProvider();
  return (
    <BrowserRouter>
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/signin" element={<SignIN />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route path="/add/product" element={<AddNewProduct />} />
        <Route path="/update/:id" element={<UpdtaeProduct />} />
        <Route path="/product/:id" element={<ViewProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<PastOrders />} />
        <Route path="/:id/orders" element={<CustomerOrder />} />
      </Routes>

      {/* <FileUploadComponent /> */}
    </BrowserRouter>
    // <ImageUploadComponent />
  );
}

export default App;
