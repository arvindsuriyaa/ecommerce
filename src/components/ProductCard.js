/* eslint-disable no-sequences */
import React, { useState, useEffect } from "react";
import "../styles/ProductCard.scss";
import { bindDispatch } from "../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
const ProductCard = (props) => {
  console.log("productCards", props);
  const { productInfo, actions } = props;
  const { addToCart, reduceItem } = actions;
  const [cart, setCart] = useState(0);
  console.log("Product props",
    productInfo
  );

  useEffect(() => {
    const data = sessionStorage.getItem("userDetails");
    let currentUser = JSON.parse(data);
    console.log("productINFO", productInfo.name);

    currentUser.map((item) =>
      item.isLoggedIn
        ? item.categories.map((purchase) =>
            purchase.isChecked
              ? purchase.products.map((purchaseItem) =>
                  purchaseItem.name === productInfo.name
                    ? setCart(purchaseItem.addedToCart)
                    : null
                )
              : null
          )
        : null
    );
  }, [productInfo]);

  return (
    <div id="card">
      <div className="title">{productInfo.name}</div>
      <div
        className="image"
        style={{ backgroundImage: "url(" + productInfo.imgSrc + ")" }}
      ></div>
      <div className="aboutBrand">
        <div>{productInfo.brand}</div>
        <div>{productInfo.mrp}</div>
      </div>
      <div className="addToCard">
        <button
          onClick={() => {
            setCart(cart + 1);
            addToCart(productInfo);
          }}
          style={cart === 0 ? { display: "block" } : { display: "none" }}
        >
          AddToCard
        </button>
        <div style={cart > 0 ? { display: "block" } : { display: "none" }}>
          <button
            onClick={() => {
              setCart(cart - 1);
              reduceItem(productInfo);
            }}
          >
            -
          </button>
          {cart}
          <button
            onClick={() => {
              setCart(cart + 1);
              addToCart(productInfo);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);


export default connect(mapStateToProps,bindDispatch)(ProductCard);
