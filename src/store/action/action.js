import { useState } from "react";

import ASSIGN_DATA from "../Types/types";

export const assignData = (name, value) => ({
  type: ASSIGN_DATA,
  payload: { name: name, value: value },
});

export const collectInfo = (event) => {
  return (dispatch, getState) => {
    const { userDetails } = getState().reducer;
    dispatch(
      assignData("userDetails", {
        ...userDetails,
        [event.target.name]: event.target.value,
      })
    );
  };
};

export const placeOrder = () => {
  return (dispatch, getState) => {
    // console.log("placeOrder", props);
    const data = sessionStorage.getItem("userDetails");
    let currentUser = JSON.parse(data);
    let notification;
    let userIndex;
    let login = getState().reducer;
    currentUser.map((user, index) =>
      user.isLoggedIn
        ? user.categories.map((purchase) =>
            purchase.isChecked
              ? purchase.products.map(
                  (purchaseItem) => (
                    (purchaseItem.addedToCart = 0),
                    (purchaseItem.quantityprice = 0),
                    (userIndex = index),
                    (notification = 0)
                  )
                )
              : null
          )
        : null
    );
    sessionStorage.clear();
    sessionStorage.setItem("userDetails", JSON.stringify(currentUser));
    dispatch(assignData("userDetails", currentUser));
    dispatch(assignData("notification", notification));
    login.categories = currentUser[userIndex].categories;
    dispatch(assignData("login", login));
    // props.onClose;
  };
};
export const addToCart = (productInfo) => {
  //   debugger
  return (dispatch, getState) => {
    let { notification, login } = getState().reducer;
    const data = sessionStorage.getItem("userDetails");
    let currentUser = JSON.parse(data);
    console.log("productINFO", productInfo.name);
    notification = 0;
    let userIndex;
    currentUser.map((user, index) =>
      user.isLoggedIn
        ? user.categories.map((purchase) =>
            purchase.isChecked
              ? purchase.products.map(
                  (purchaseItem) => (
                    purchaseItem.name === productInfo.name
                      ? ((purchaseItem.addedToCart += 1),
                        (purchaseItem.quantityPrice =
                          purchaseItem.addedToCart * purchaseItem.mrp))
                      : null,
                    (notification += purchaseItem.addedToCart),
                    (userIndex = index)
                  )
                )
              : null
          )
        : null
    );

    console.log("currentUser", currentUser);
    sessionStorage.clear();
    sessionStorage.setItem("userDetails", JSON.stringify(currentUser));
    dispatch(assignData("userDetails", currentUser));
    dispatch(assignData("notification", notification));
    login.categories = currentUser[userIndex].categories;
    dispatch(assignData("login", login));
  };
};

export const reduceItem = (productInfo) => {
  console.log("productINFO", productInfo);
  return (dispatch, getState) => {
    let { notification, login } = getState().reducer;
    const data = sessionStorage.getItem("userDetails");
    let currentUser = JSON.parse(data);
    let userIndex;
    notification = 0;
    currentUser.map((item, index) =>
      item.isLoggedIn
        ? item.categories.map((purchase) =>
            purchase.isChecked
              ? purchase.products.map(
                  (purchaseItem) => (
                    purchaseItem.name === productInfo.name
                      ? ((purchaseItem.addedToCart -= 1),
                        (purchaseItem.quantityPrice =
                          purchaseItem.addedToCart * purchaseItem.mrp))
                      : null,
                    (notification += purchaseItem.addedToCart),
                    (userIndex = index)
                  )
                )
              : null
          )
        : null
    );
    console.log("currentUser", currentUser);
    sessionStorage.clear();
    sessionStorage.setItem("userDetails", JSON.stringify(currentUser));
    dispatch(assignData("userDetails", currentUser));
    dispatch(assignData("notification", notification));
    login.categories = currentUser[userIndex].categories;
    dispatch(assignData("login", login));
  };
};
