/* eslint-disable no-sequences */
import React, { useState, useEffect } from "react";
import * as styles from "../styles/ProductCard.module.scss";
import { bindDispatch } from "../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import Button from "./common/Button";

const ProductCard = (props) => {
  const { productInfo, actions } = props;
  const { addToCart, reduceItem } = actions;
  const [cart, setCart] = useState(0);
  useEffect(() => {
    const data = sessionStorage.getItem("userDetails");
    let currentUser = JSON.parse(data);

    currentUser.map((item, index) => {
      if (item.isLoggedIn) {
        return item.categories.map((purchase) => {
          if (purchase.isChecked) {
            return purchase.products.map((purchaseItem) => {
              if (purchaseItem.name === productInfo.name) {
                setCart(purchaseItem.addedToCart);
              }
            });
          }
        });
      }
    });
  }, [productInfo]);

  return (
    <div id={styles.card}>
      <div className={styles.title}>{productInfo.name}</div>
      <div
        className={styles.image}
        style={{ backgroundImage: "url(" + productInfo.imgSrc + ")" }}
      ></div>
      <div className={styles.aboutBrand}>
        <div>{productInfo.brand}</div>
        <div>${productInfo.mrp}</div>
      </div>
      <div className={styles.addToCard}>
        <Button
          onClick={() => {
            setCart(cart + 1);
            addToCart(productInfo);
          }}
          className={cart === 0 ? styles.show : styles.hide}
        >
          AddToCard
        </Button>
        <div className={styles.customize}>
          <div className={cart > 0 ? styles.show : styles.hide}>
            <Button
              className={styles.remove}
              onClick={() => {
                setCart(cart - 1);
                reduceItem(productInfo);
              }}
            >
              -
            </Button>
            <div className={styles.quantity}>{cart}</div>
            <Button
              className={styles.add}
              onClick={() => {
                setCart(cart + 1);
                addToCart(productInfo);
              }}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(ProductCard);
