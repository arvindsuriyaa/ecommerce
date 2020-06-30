/* eslint-disable no-sequences */
import React, { useEffect } from "react";
import * as styles from "../styles/Categories.module.scss";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { bindDispatch } from "../utils";
import Input from "./common/Input";

const Categories = (props) => {
  const { actions, reducer } = props;
  const { toggleChange } = actions;
  const { login } = reducer;
  const { categories } = login;
  const data = sessionStorage.getItem("userDetails");
  let currentUser = JSON.parse(data);
  let currentUserIndex;
  currentUser.map((user, index) =>
    user.isLoggedIn ? (currentUserIndex = index) : null
  );

  useEffect(() => {
    let currentUser = JSON.parse(data);
    let itemCount = [];
    currentUser.map((item) => {
      if (item.isLoggedIn) {
        return item.categories.map((purchase) => {
          return purchase.products.map((purchaseItem) => {
            itemCount.push(purchaseItem.addedToCart);
          });
        });
      }
    });
    let totalItem = 0;
    itemCount.map((item) => (totalItem += item));
    actions.assignData("notification", totalItem);
  }, [data]);

  const selectAll = () => {
    let userIndex;
    let currentUser = JSON.parse(data);
    currentUser.map((product, index) =>
      product.isLoggedIn
        ? ((userIndex = index),
          (product.selectAll = !product.selectAll),
          product.categories.map((categories) => (categories.isChecked = true)))
        : null
    );
    sessionStorage.clear();
    sessionStorage.setItem("userDetails", JSON.stringify(currentUser));
    actions.assignData("userDetails", currentUser);
    actions.assignData("login", {
      ...login,
      categories: currentUser[userIndex].categories,
    });
  };

  return (
    <div id={styles.list}>
      <ul className={styles.items}>
        <li
          className={
            currentUser[currentUserIndex].selectAll ? styles.fade : styles.show
          }
        >
          <span>All Categories</span>
          <Input
            type="checkbox"
            className={styles.toggleCheck}
            name="All Categories"
            checked={currentUser[currentUserIndex].selectAll}
            onChange={(event) => selectAll(event)}
          />
        </li>
        {categories &&
          categories.map((product, index) => (
            <li key={index}>
              {product.label}
              <Input
                type="checkbox"
                className={styles.toggleCheck}
                name={product.label}
                checked={product.isChecked ? true : false}
                onChange={(event) => toggleChange(event)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};
const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(Categories);
