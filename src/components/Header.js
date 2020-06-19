import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.scss";
import { bindDispatch } from "../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";

const Header = (props) => {
  console.log("HEADRE", props);
  const { reducer, actions } = props;
  let { notification, userDetails } = reducer;
  const [user, setUser] = useState([]);
  const [toggle, setToggle] = useState(true);
  let data = sessionStorage.getItem("userDetails");
  let currentUser = JSON.parse(data);
  let indice = useRef(null);
  useEffect(() => {
    let currentUser = JSON.parse(data);
    let itemCount = [];
    let userIndex;
    currentUser.map((item, index) =>
      item.isLoggedIn
        ? item.categories.map((purchase) =>
            purchase.isChecked
              ? purchase.products.map(
                  (purchaseItem) => itemCount.push(purchaseItem.addedToCart),
                  (userIndex = index)
                )
              : null
          )
        : null
    );
    let totalItem = 0;
    itemCount.map((item) => (totalItem += item));
    // setCartCount(totalItem);
    setUser(currentUser[userIndex]);
    indice.current = user;
    notification = totalItem;
    actions.assignData("notification", totalItem);
  }, []);

  return (
    <div id="title">
      <span>Welcome to React E-commerce Shopping Mart</span>
      <div className="link">
        <NavLink to="/layout/shopping-cart">
          <i class="fas icon fa-shopping-cart"></i>
          <span className="notification">{notification}</span>
        </NavLink>
        <div style={{width:"118px", textTransform:"uppercase"}}>
          <NavLink
            to="/"
            style={!toggle ? { display: "block" } : { display: "none" }}
            onClick={props.logout}
          >
            logout
          </NavLink>
          <div
            onClick={() => setToggle(false)}
            className="user"
            style={toggle ? { display: "block" } : { display: "none" }}
          >
            {user.name}
          </div>
        </div>
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
