import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.scss";
import { bindDispatch } from "../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";

const Header = (props) => {
  console.log("HEADRE", props);
  const { reducer, actions } = props;
  let { notification, userDetails } = reducer;

  let data = sessionStorage.getItem("userDetails");
  useEffect(() => {
    let currentUser = JSON.parse(data);
    let itemCount = [];
    currentUser.map((item) =>
      item.isLoggedIn
        ? item.categories.map((purchase) =>
            purchase.isChecked
              ? purchase.products.map((purchaseItem) =>
                  itemCount.push(purchaseItem.addedToCart)
                )
              : null
          )
        : null
    );
    let totalItem = 0;
    itemCount.map((item) => (totalItem += item));
    // setCartCount(totalItem);
    notification = totalItem;
    actions.assignData("notification", totalItem);
  }, []);

  return (
    <div id="title">
      <span>Welcome to React E-commerce Shopping Mart</span>
      <div className="link">
        <NavLink to="/layout/shopping-cart">
          ShoppingCart<span className="notification">{notification}</span>
        </NavLink>
        <NavLink to="/" onClick={props.logout}>
          logout
        </NavLink>
      </div>
    </div>
  );
};
const mapStateToProps = createSelector(
  (state) => state.reducer, // input selector
  (reducer) => ({ reducer }) // app is the value of the input selector
);

export default connect(mapStateToProps, bindDispatch)(Header);
// export default Header;
