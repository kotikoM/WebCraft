import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import "../styles/product.css";
import { LuEyeOff } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { IoCartSharp } from "react-icons/io5";
import { CgUnavailable } from "react-icons/cg";

const product = ({ product }) => {
  const [isFullView, setToFullView] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [isInCart, setIsInCart] = useState(
    cartItems?.some((item) => item.id === product.id)
  );

  useEffect(() => {
    setIsInCart(cartItems.some((item) => item.id === product.id));
  }, [cartItems, product.id]);

  const handleCartChange = () => {
    if (isInCart) {
      dispatch(removeFromCart(product));
    } else {
      dispatch(addToCart(product));
    }

    setIsInCart((prev) => !prev);
  };

  return (
    <div className={`product ${product.isAvailable ? '' : 'unavailable'}`}>
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <h2>{product.name}</h2>

      {isFullView && (
        <>
          <p className="category">Category: {product.category}</p>
          <p className="product-description">
            Description: {product.description}
          </p>
        </>
      )}
      <div className="low-info">
        <p className="price">${product.price}</p>

        <div className="actions">
          {product.isAvailable ? (
            <>
              <div className="product-cart" onClick={handleCartChange}>
                {!isInCart ? (
                  <IoCartOutline />
                ) : (
                  <IoCartSharp className="in-cart" />
                )}
              </div>
              <div
                className="view-toggle"
                onClick={() => setToFullView((prev) => !prev)}
              >
                {isFullView ? <LuEye /> : <LuEyeOff />}
              </div>
            </>
          ) : (<>Unavaliable</>)}
        </div>
      </div>
    </div>
  );
};

export default product;
