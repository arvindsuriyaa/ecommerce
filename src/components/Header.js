import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import * as styles from "../styles/header.module.scss";
import { bindDispatch } from "../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import * as directory from "../utils/RootDirectory";

const Header = (props) => {
  const { reducer, actions } = props;
  let history = useHistory();
  let { notification, login } = reducer;
  const [user, setUser] = useState([]);
  const [toggle, setToggle] = useState(true);
  let data = sessionStorage.getItem("userDetails");

  useEffect(() => {
    let currentUser = JSON.parse(data);
    let itemCount = [];
    let userIndex;
    currentUser.map((item, index) => {
      userIndex = index;
      if (item.isLoggedIn) {
        return item.categories.map((purchase) => {
          if (purchase.isChecked) {
            return purchase.products.map((purchaseItem) => {
              itemCount.push(purchaseItem.addedToCart);
            });
          }
        });
      }
    });
    let totalItem = 0;
    itemCount.map((item) => (totalItem += item));
    setUser(currentUser[userIndex]);
    actions.assignData("notification", totalItem);
  }, [data]);

  const logout = () => {
    const data = sessionStorage.getItem("userDetails");
    let currentUser = JSON.parse(data);
    currentUser.map((item) =>
      item.isLoggedIn ? (item.isLoggedIn = false) : null
    );
    login.id = 0;
    login.categories = [];
    actions.assignData("login", login);
    sessionStorage.clear();
    actions.assignData("userDetails", currentUser);
    sessionStorage.setItem("userDetails", JSON.stringify(currentUser));
    history.push(directory.LOGIN);
  };

  return (
    <div id={styles.title}>
      <span>Welcome to React E-commerce Shopping Mart</span>
      <div className={styles.link}>
        <div className={styles.userSection}>
          <NavLink
            to="/"
            className={!toggle ? styles.show : styles.hide}
            onClick={logout}
          >
            logout
          </NavLink>
          <div
            onClick={() => setToggle(false)}
            className={toggle ? styles.show : styles.hide}
          >
            {user.name}
          </div>
        </div>
        <NavLink to={directory.SHOPPING_CART} className={styles.icon}>
          <i className="fas fa-shopping-cart"></i>
          <span className={styles.notification}>{notification}</span>
        </NavLink>
      </div>
    </div>
  );
};
const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(Header);
