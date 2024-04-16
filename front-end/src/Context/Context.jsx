import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ContextApi = createContext();

const Context = ({ children }) => {
  const [PastOrders, setPastOrders] = useState([]);
  const [summaryToggle, setSummaryToggle] = useState(false);
  const [pastOrderSummaryToggle, setPastOrderSummaryToggle] = useState(false);
  const [filterproduct, setFilterproduct] = useState({});
  const [OrderConfimation, setOrderConfimation] = useState(false);
  const [cancelToggle, setCanceltoggle] = useState(false);
  const [userName, setUserName] = useState("");
  const [products, setProducts] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [adminREG, setAdminREG] = useState(false);
  const [adminProducts, setAdminProducts] = useState([]);
  const [sellerId, setSellerId] = useState();
  const [cart, setCart] = useState([]);
  const [viewSingleProduct, setViewSingleProduct] = useState({});

  let userAddress = [];
  // fetch ALL products
  const fetchAllProducts = async () => {
    const response = await fetch(
      "https://mini-cart-backend.onrender.com/api/products",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();

    setProducts(result);
    console.log(result);
  };

  const fetchAdminProducts = async () => {
    const response = await fetch(
      "https://mini-cart-backend.onrender.com/api/products/seller",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Token: localStorage.getItem("token"),
        },
      }
    );
    const result = await response.json();

    setAdminProducts(result);
  };

  const fetchAllAddresses = async () => {
    const response = await fetch(
      "https://mini-cart-backend.onrender.com/users/fetchaddress",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Token: localStorage.getItem("token"),
        },
      }
    );
    const result = await response.json();

    setSellerId(result.sellerId);
    // setUserAddresses(result);
    userAddress.push(result.address);
    if (result.isAdmin === "true") {
      setAdmin(true);
    }
  };

  const addtoCart = async (address) => {
    const response = await fetch(
      "https://mini-cart-backend.onrender.com/api/cart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: localStorage.getItem("token"),
        },
        body: JSON.stringify(address),
      }
    );
    const res = await response.json();
    console.log(response.ok);
    if (response.ok) {
      toast.success(`🦄 ${res.message} !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.warn(`🦄 ${res.message} !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const createNewOrder = async (product) => {
    const response = await fetch(
      "https://mini-cart-backend.onrender.com/api/create/order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: localStorage.getItem("token"),
        },
        body: JSON.stringify(product),
      }
    );

    const res = await response.json();

    if (response.ok) {
      toast.success(`🦄 ${res.message} !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.warn(`🦄 ${res.message} !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  //remove item from cart
  const removeCartProduct = async (id) => {
    const response = await fetch(
      `https://mini-cart-backend.onrender.com/api/cart/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Token: localStorage.getItem("token"),
        },
      }
    );
    const res = await response.json();
    if (response.ok) {
      fetchALLcarts();
      toast.success(`🦄 ${res.message} !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.warn(`🦄 ${res.message} !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  //get all past orders
  const getAllPastOrders = async () => {
    const response = await fetch(
      "https://mini-cart-backend.onrender.com/api/orders",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Token: localStorage.getItem("token"),
        },
      }
    );
    const result = await response.json();

    // const finalResult = result.pastOrders;
    console.log(result);

    setPastOrders(result);
  };

  const filteredProduct = async (id) => {
    const response = await fetch(
      `https://mini-cart-backend.onrender.com/api/products/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Token: localStorage.getItem("token"),
        },
      }
    );
    const result = await response.json();
    setFilterproduct(result);
  };

  const deleteProduct = async (id) => {
    const response = await fetch(
      `https://mini-cart-backend.onrender.com/api/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Token: localStorage.getItem("token"),
        },
      }
    );
    const res = await response.json();

    if (response.ok) {
      fetchAdminProducts();
      toast.success(`🦄 ${res.message} !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.warn(`🦄 ${res.message} !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    getAllPastOrders();
  };

  const addNewProduct = async (product) => {
    const response = await fetch(
      "http://localhost:5000/api/add",

      {
        method: "POST",
        headers: {
          Token: localStorage.getItem("token"),
        },
        body: product,
      }
    );
    const res = await response.json();
    console.log(res);
  };

  const fetchALLcarts = async () => {
    const response = await fetch(
      "https://mini-cart-backend.onrender.com/api/getcart",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Token: localStorage.getItem("token"),
        },
      }
    );
    const result = await response.json();

    setCart(result);
  };
  // view single product
  const ViewsingleProduct = async (id) => {
    const response = await fetch(
      `https://mini-cart-backend.onrender.com/api/products/${id}`,
      {
        method: "GET",
        headers: {
          headers: {
            "Content-Type": "application/json",
          },
        },
      }
    );
    const result = await response.json();

    setViewSingleProduct(result);
  };

  useEffect(() => {
    fetchAllProducts();
    fetchAllAddresses();
    getAllPastOrders();
    fetchAdminProducts();
    fetchALLcarts();
    // filterproduct("65e062a583d25daac0522642");
  }, []);

  return (
    <ContextApi.Provider
      value={{
        fetchALLcarts,
        userName,
        setUserName,
        PastOrders,
        createNewOrder,
        userAddress,
        addtoCart,
        fetchAllAddresses,
        adminProducts,
        OrderConfimation,
        setOrderConfimation,
        summaryToggle,
        setSummaryToggle,
        filteredProduct,
        pastOrderSummaryToggle,
        setPastOrderSummaryToggle,
        filterproduct,
        setFilterproduct,
        getAllPastOrders,
        cancelToggle,
        setCanceltoggle,
        deleteProduct,
        products,
        admin,
        setAdmin,
        adminREG,
        setAdminREG,
        sellerId,
        addNewProduct,
        fetchAdminProducts,
        cart,
        removeCartProduct,
        fetchAllProducts,
        ViewsingleProduct,
        viewSingleProduct,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export const contextProvider = () => {
  return useContext(ContextApi);
};
export default Context;
