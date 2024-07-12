import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../slices/cartSlice";
import "../styles/cart.css";
import { useTranslation } from "react-i18next";
import { RxCross2 } from "react-icons/rx";
import { FiMinus } from "react-icons/fi";

const Cart = ({ isVisible, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleItemRemove = (product) => {
    dispatch(removeFromCart(product));
  };
  const { t } = useTranslation("cart");

  return (
    isVisible && (
      <div className="cart">
        <div className="cart-header">
          <h1 className="title">{t("title")}</h1>
          <RxCross2 className="close" onClick={onClose} />
        </div>
        <ul className="cart-items">
          {cartItems.map((product) => (
            <li key={product.id} className="cart-item">
              <div className="item-info">
                <h2 className="item-title">{product.name}</h2>
                <p className="item-desc">{product.description}</p>
                <p className="price">${product.price}</p>
              </div>

              <div className="actions">
                <FiMinus
                  className="remove"
                  onClick={() => handleItemRemove(product)}
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="cart-footer">
          <h2 className="total">
            Total: ${cartItems.reduce((acc, product) => acc + product.price, 0)}
          </h2>

          
            <button>Buy</button>
          
        </div>
      </div>
    )
  );
};

export default Cart;
