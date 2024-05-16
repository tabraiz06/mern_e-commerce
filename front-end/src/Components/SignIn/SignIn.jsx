import React, { useState } from "react";
import "./SignIn.css";
import padlock from "./padlock.svg";
import { useNavigate } from "react-router-dom";
import { contextProvider } from "../../Context/Context";
import { ToastContainer, toast } from "react-toastify";
const SignIn = () => {
  let initials = {
    email: "user@gmail.com",
    phoneNumber: "",
    password: "123456",
  };
  const [credentials, setCredentials] = useState(initials);
  const [admin, setAdmin] = useState(false);

  const handleInput = () => {
    setAdmin(true);
    initials = {
      email: "admin@gmail.com",
      phoneNumber: "",
      password: "123456",
    };
    setCredentials(initials);
  };
  console.log(admin);
  // const { getAllPastOrders, PastOrders, userName, setUserName } =
  //   contextProvider();

  const navigate = useNavigate();
  const [Token, setToken] = useState("");
  const { fetchAllAddresses } = contextProvider();

  const signInApi = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://mini-cart-backend.onrender.com/users/signin",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    const res = await response.json();
    const token = res.token;

    if (response.ok) {
      fetchAllAddresses();
      localStorage.setItem("token", token);
      navigate("/");

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

  function getInputChangeHandler(key) {
    return (e) => {
      const val = e.target.value;
      setCredentials((credentials) => {
        return {
          ...credentials,
          [key]: val,
        };
      });
    };
  }
  return (
    <form method="POST" onSubmit={signInApi}>
      <span className="signIn-title">SIGN IN</span>
      <input
        value={credentials.email}
        type="text"
        placeholder="Mobile/Email"
        // value={credentials.email || credentials.phoneNumber}
        onChange={(e) => {
          !/[a-zA-Z]/.test(e.target.value)
            ? setCredentials((credentials) => {
                return {
                  ...credentials,
                  phoneNumber: e.target.value,
                };
              })
            : setCredentials((credentials) => {
                return {
                  ...credentials,
                  email: e.target.value,
                };
              });
        }}
      />
      <input
        value={credentials.password}
        type="password"
        placeholder="Password"
        // value={credentials.password}
        onChange={getInputChangeHandler("password")}
      />
      <img src={padlock} />
      <div className="flex w-full justify-between">
        <span className="text-blue-500" onClick={handleInput}>
          Sign in as seller
        </span>
        <span
          className="forgot-password"
          onClick={() => [setAdmin(false), setCredentials(initials)]}
        >
          Sign in as Customer
        </span>
      </div>
      <button type="Submit">Sign In</button>
    </form>
  );
};

export default SignIn;
