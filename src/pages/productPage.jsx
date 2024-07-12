import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import "../styles/productPage.css";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const { t: tProduct } = useTranslation("productData");

  useEffect(() => {
    const fetchedProducts = tProduct("products", { returnObjects: true });
    const currentProduct = fetchedProducts.find(
      (p) => p.id === parseInt(productId)
    );
    if (currentProduct) {
      setProduct(currentProduct);
    }
  }, [productId, tProduct]);

  return (
    <div className="product-wrapper">
      <img src={product.image} alt={product.name} />
      <div className="info">
        <h2>{product.name}</h2>
        <p className="desc">{product.description}</p>

        <p className="price">Price: ${product.price}</p>

        <a href="https://www.example.com" className="card-link" target="_blank">
          Also see...
        </a>
      </div>
    </div>
  );
};

export default Product;
