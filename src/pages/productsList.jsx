import React, { useState, useEffect, lazy } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { FaShoppingCart } from "react-icons/fa";
import Badge from "@mui/material/Badge";
import Slider from "@mui/material/Slider";
import "../styles/productsList.css";
const Product = lazy(() => import("../components/product"));
const Cart = lazy(() => import("../components/cart"));

const ProductsList = () => {
  const { t: tProduct } = useTranslation("productData");
  const { t: tProductsList } = useTranslation("productsList");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortCriteria, setSortCriteria] = useState({
    sortBy: "name",
    sortOrder: "asc",
  });
  const [showCart, setShowCart] = useState(false);
  const itemsLength = useSelector((state) => state.cart.items.length);
  const [sliderValue, setsliderValue] = useState([0, 5000]);

  const handleChange = (event, newValue) => {
    if (Math.abs(newValue[1] - newValue[0]) >= 1000) {
      setsliderValue(newValue);
    }
  };

  useEffect(() => {
    const fetchedProducts = tProduct("products", { returnObjects: true });
    setAllProducts(fetchedProducts);
    setFilteredProducts(fetchedProducts);
  }, [tProduct]);

  useEffect(() => {
    let filtered = allProducts.filter(
      (product) => product.price >= sliderValue[0] && product.price <= sliderValue[1]
    );

    if (searchInput) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    filtered = filtered.sort((a, b) => {
      const attrA = a[sortCriteria.sortBy];
      const attrB = b[sortCriteria.sortBy];

      if (sortCriteria.sortOrder === "ASC") {
        if (attrA < attrB) return -1;
        if (attrA > attrB) return 1;
        return 0;
      } else if (sortCriteria.sortOrder === "DESC") {
        if (attrA > attrB) return -1;
        if (attrA < attrB) return 1;
        return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [
    allProducts,
    searchInput,
    selectedCategories,
    sortCriteria,
    showSortOptions,
    sortCriteria,
    sliderValue,
  ]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const toggleSortOptions = () => {
    setShowSortOptions((prev) => !prev);
  };

  const handleSortChange = (criterion) => {
    const [sortBy, sortOrder] = criterion.split(" ");
    setSortCriteria({ sortBy, sortOrder });
  };

  const toggleCartVisibility = () => {
    setShowCart((prev) => !prev);
  };

  return (
    <div className="products">
      <div className="header">
        <h1>{tProductsList("catalog")}</h1>

        <div className="utility">
          <input
            type="text"
            placeholder={tProductsList("search")}
            value={searchInput}
            onChange={handleSearchInputChange}
            className="search-input"
          />

          <div className="sort-dropdown" onClick={toggleSortOptions}>
            <span>{tProductsList("sort-by")}</span>

            {showSortOptions && (
              <ul className="sort-options">
                <li onClick={() => handleSortChange("name ASC")}>
                  {tProductsList("name-AZ")}
                </li>
                <li onClick={() => handleSortChange("name DESC")}>
                  {tProductsList("name-ZA")}
                </li>
                <li onClick={() => handleSortChange("price ASC")}>
                  {tProductsList("price-ASC")}
                </li>
                <li onClick={() => handleSortChange("price DESC")}>
                  {tProductsList("price-DESC")}
                </li>
              </ul>
            )}
          </div>

          <div className="shopping-cart">
            <Badge
              badgeContent={itemsLength}
              color="secondary"
              max={999}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <FaShoppingCart
                className="cart-icon"
                onClick={toggleCartVisibility}
              />
            </Badge>
            <Cart isVisible={showCart} onClose={toggleCartVisibility} />{" "}
          </div>
        </div>
      </div>

      <div className="catalog">
        <div className="filters">
          <p className="filters-title">{tProductsList("filters")}</p>

          <ul className="filter-options">
            <li>
              <h3>{tProductsList("category")}</h3>
              <button
                className={
                  selectedCategories.includes("Website Packages")
                    ? "active"
                    : ""
                }
                onClick={() => handleCategoryClick("Website Packages")}
              >
                {tProductsList("Website Packages")}
              </button>
              <button
                className={
                  selectedCategories.includes("E-commerce Solutions")
                    ? "active"
                    : ""
                }
                onClick={() => handleCategoryClick("E-commerce Solutions")}
              >
                {tProductsList("E-commerce Solutions")}
              </button>
              <button
                className={
                  selectedCategories.includes("Custom Development")
                    ? "active"
                    : ""
                }
                onClick={() => handleCategoryClick("Custom Development")}
              >
                {tProductsList("Custom Development")}
              </button>
              <button
                className={
                  selectedCategories.includes("Digital Marketing")
                    ? "active"
                    : ""
                }
                onClick={() => handleCategoryClick("Digital Marketing")}
              >
                {tProductsList("Digital Marketing")}
              </button>
              <button
                className={
                  selectedCategories.includes("Maintenance and Support")
                    ? "active"
                    : ""
                }
                onClick={() => handleCategoryClick("Maintenance and Support")}
              >
                {tProductsList("Maintenance and Support")}
              </button>
              <button
                className={
                  selectedCategories.includes("Additional Features")
                    ? "active"
                    : ""
                }
                onClick={() => handleCategoryClick("Additional Features")}
              >
                {tProductsList("Additional Features")}
              </button>
            </li>

            <li>
              <h3 className="price-filter">{tProductsList("price")}</h3>

              <Slider
              className="slider"
                value={sliderValue}
                onChange={handleChange}
                valueLabelDisplay="on"
                step={100}
                min={0}
                max={5000}
                aria-labelledby="price-slider"
                disableSwap
                color="secondary"
                sx={{
                  "& .MuiSlider-thumb": {
                    color: "gray",
                  },
                  "& .MuiSlider-track": {
                    color: "#eeecdf",
                  },
                  "& .MuiSlider-rail": {
                    color: "#b0ad9e",
                  },
                }}
              />
            </li>
          </ul>
        </div>

        <ul className="products-list">
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <Product product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsList;
