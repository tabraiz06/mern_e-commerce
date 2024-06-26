import React, { useEffect, useState } from "react";
import { contextProvider } from "../../Context/Context";
import UpdtaeProduct from "../updateProduct/UpdtaeProduct";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [quantity, setQuantity] = useState(0);
  let finalPrice = Number;

  const navigate = useNavigate();
  const {
    products,
    admin,
    adminProducts,
    deleteProduct,
    filteredProduct,
    addtoCart,
    fetchALLcarts,
    fetchAllProducts,
    fetchAllAddresses,
    ViewsingleProduct,
    serchItems,
    setSerchItems,
  } = contextProvider();

  const [filter, setFilter] = useState(false);
  const [select, setSelect] = useState("");

  const [search, setSearch] = useState("");
  const [flterProducts, setFilterProducts] = useState([]);
  const handleChange = (e) => {
    const filter = products.filter((ele) => {
      if (ele.p_name == e.target.value) {
        return ele;
      }
    });

    setFilterProducts(filter);
  };

  const handleCart = (id, price) => {
    if (quantity === 0) {
      alert("add quantity");
    } else {
      price = quantity * price;
      let cart = {
        productId: id,
        finalPrice: price,

        quantity,
      };
      addtoCart(cart);
      fetchALLcarts();
    }
  };

  // view single product
  const viewProduct = async (id) => {
    await ViewsingleProduct(id);
    navigate(`/product/${id}`);
  };
  useEffect(() => {
    fetchAllProducts();
    fetchAllAddresses();
  }, []);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  products.filter((ele) => {
    if (ele.p_name == search) {
      console.log(ele);
    } else {
      // console.log(ele);
    }
  });

  return (
    <div>
      <div>{filter && <UpdtaeProduct />}</div>
      <div className="filters flex justify-around mb-[2rem]">
        <div className="flex items-center">
          <h1 className="font-bold text-xl">Filter </h1>

          <select
            name="filter-items"
            className="w-[10rem]"
            onChange={(e) => setSelect(e.target.value)}
          >
            <option value="all">Brand</option>
            <option value="nike">Nike</option>
            <option value="adidas">Adidas</option>
            <option value="reebok">Reebok</option>
          </select>
        </div>

        <input
          style={{ borderBottom: "1px solid" }}
          type="text"
          placeholder="search by name"
          className="px-[10px] py-[15px] outline-none w-[250px]"
          onChange={handleSearch}
        />
      </div>
      <div className="flex flex-wrap gap-5 items-center justify-center">
        {products
          .filter((ele) => {
            if (search !== "") {
              return ele.p_name.includes(search);
            } else if (select === "all") {
              return ele;
            }
            return ele.p_name.includes(select);
          })
          .map((ele, index) => {
            return (
              <div key={ele._id}>
                <div key={ele._id} className="max-w-[500px] overflow-hidden">
                  <img
                    src={`./images/${ele.p_image}`}
                    alt="product image"
                    className="rounded-2xl h-[250px] w-[70%] mx-auto my-0"
                  />
                  <h1 className=" font-bold text-2xl">{ele.p_name}</h1>
                  <p className="text-lg">{ele.p_discription}</p>
                  <div className="flex justify-between my-[10px]">
                    <label htmlFor="quantity" className="text-xl font-semibold">
                      qtn
                    </label>
                    <input
                      type="number"
                      className="w-[83px] h-[30px] border border-black "
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <h2 className="font-bold text-2xl">
                      Price: {ele.p_price}/RS <br />
                      <span className="text-sm font-normal">
                        final price: {quantity * ele.p_price}
                      </span>
                    </h2>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => viewProduct(ele._id)}
                      className=" font-bold text-2xl bg-blue-800 px-[20px] py-[10px] rounded"
                    >
                      view
                    </button>
                    <button
                      className=" font-bold text-2xl bg-blue-800 px-[20px] py-[10px] rounded"
                      onClick={() => handleCart(ele._id, ele.p_price)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Products;
