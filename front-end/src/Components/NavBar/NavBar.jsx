import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { contextProvider } from "../../Context/Context";
const NavBar = () => {
  const token = localStorage.getItem("token");
  const [logout, setLogout] = useState(false);

  const { admin, cart } = contextProvider();

  const Navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");

    Navigate("/");
    window.location.reload();
  };
  return (
    <div className="nav-container">
      <div className="logo">
        <div>Mini Store</div>
      </div>
      <div className="nav-menu">
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <div>Home</div>
        </NavLink>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <div>Products</div>
        </NavLink>
        {admin && (
          <NavLink to="/admin" style={{ textDecoration: "none" }}>
            <div>Admin</div>
          </NavLink>
        )}
        <NavLink to="/cart" style={{ textDecoration: "none" }}>
          <div>Cart :{cart.length}</div>
        </NavLink>
        <NavLink to="/orders" style={{ textDecoration: "none" }}>
          <div>Orders</div>
        </NavLink>

        {!token ? (
          <NavLink to="/signin" style={{ textDecoration: "none" }}>
            <div>Sign In</div>
          </NavLink>
        ) : (
          <>
            <Link onClick={handleLogout} style={{ textDecoration: "none" }}>
              <div className="logout">Log Out</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
