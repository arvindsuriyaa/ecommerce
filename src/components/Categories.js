/* eslint-disable no-sequences */
import React, { useState, useEffect } from "react";
import "../styles/Categories.scss";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { bindDispatch } from "../utils";

const Categories = (props) => {
  const { actions, reducer } = props;
  const { login } = reducer;
  const { categories } = login;

  const [state, setState] = useState([]);
  
  useEffect(() => {
    setState(categories);
  }, []);

  const data = sessionStorage.getItem("userDetails");
  let currentUser = JSON.parse(data);
  let currentUserIndex;
  currentUser.map((user, index) =>
    user.isLoggedIn ? (currentUserIndex = index) : null
  );

  const toggleChange = (event) => {
    let indexValue;
    categories.map((item, index) =>
      event.target.name === item.label
        ? ((item.isChecked = !item.isChecked), (indexValue = index))
        : null
    );
    actions.assignData("login", { ...login, categories: categories });
    // debugger;

    setState(categories);
    let currentUser = JSON.parse(data);
    let userIndex;
    console.log("currentuser", currentUser);
    let checkFlag = [];
    currentUser.map((user, index) =>
      user.isLoggedIn
        ? ((userIndex = index),
          categories.map((purchase) => {
            checkFlag.push(purchase.isChecked);
          }))
        : null
    );
    for (let i = 0; i < checkFlag.length; i++) {
      if (!checkFlag[i]) {
        currentUser[userIndex].selectAll = false;
        break;
      } else {
        currentUser[userIndex].selectAll = true;
      }
    }
    currentUser.map((user, index) =>
      user.isLoggedIn
        ? ((userIndex = index),
          user.categories.map((purchase) =>
            purchase.isChecked
              ? purchase.products.map((purchaseItem) =>
                  categories[indexValue].products.map((item) =>
                    item.name === purchaseItem.name
                      ? ((item.addedToCart = purchaseItem.addedToCart),
                        (item.quantityPrice = purchaseItem.quantityPrice))
                      : null
                  )
                )
              : null
          ))
        : null
    );

    currentUser.map((product, index) =>
      product.isLoggedIn
        ? product.categories.splice(indexValue, 1, categories[indexValue])
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
    setState(currentUser[userIndex].categories);
    sessionStorage.clear();
    sessionStorage.setItem("userDetails", JSON.stringify(currentUser));
    actions.assignData("userDetails", currentUser);
    console.log("Cureent user categories", currentUser[userIndex].categories);
    actions.assignData("login", {
      ...login,
      categories: currentUser[userIndex].categories,
    });
  };

  return (
    <div id="list">
      <ul>
        <li
          style={
            currentUser[currentUserIndex].selectAll
              ? { pointerEvents: "none", opacity: 0.6 }
              : { pointerEvents: "all", opacity: 1 }
          }
        >
          <span>All Categories</span>
          <input
            type="checkbox"
            className="toggleCheck"
            name="All Categories"
            checked={currentUser[currentUserIndex].selectAll}
            onChange={(event) => selectAll(event)}
          />
        </li>
        {categories &&
          categories.map((product, index) => (
            <li key={index}>
              {product.label}
              <input
                type="checkbox"
                className="checkBox"
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

