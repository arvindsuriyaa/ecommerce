import React, { useState, useEffect } from "react";
import "../styles/shoppingCart.scss";
import { useHistory } from "react-router";
import { bindDispatch } from "../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";

const ShoppingCart = (props) => {
  const { actions, reducer } = props;
  let { notification, login } = reducer;
  const [productList, setProducts] = useState([]);

  useEffect(() => {
    const data = sessionStorage.getItem("userDetails");
    let currentUser = JSON.parse(data);
    currentUser.map((user) =>
      user.isLoggedIn
        ? (setProducts(user.categories), (login.categories = user.categories))
        : null
    );
    actions.assignData("login", login);
  }, []);

  console.log("show shopping carts", productList);

  const addToCart = (product) => {
    const data = sessionStorage.getItem("userDetails");
    let currentUser = JSON.parse(data);
    console.log("productINFO", product);
    notification = 0;
    let userIndex;
    currentUser.map((user, index) =>
      user.isLoggedIn
        ? user.categories.map((purchase) =>
            purchase.isChecked
              ? purchase.products.map(
                  (purchaseItem) => (
                    purchaseItem.name === product.name
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
    setProducts(currentUser[userIndex].categories);
    console.log("currentUser", currentUser);
    sessionStorage.clear();
    sessionStorage.setItem("userDetails", JSON.stringify(currentUser));
    actions.assignData("userDetails", currentUser);
    actions.assignData("notification", notification);
    login.categories = currentUser[userIndex].categories;
    actions.assignData("login", login);
  };

  const reduceItem = (product) => {
    const data = sessionStorage.getItem("userDetails");
    let currentUser = JSON.parse(data);
    console.log("productINFO", product);
    notification = 0;
    let userIndex;
    currentUser.map((user, index) =>
      user.isLoggedIn
        ? user.categories.map((purchase) =>
            purchase.isChecked
              ? purchase.products.map(
                  (purchaseItem) => (
                    purchaseItem.name === product.name
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
    setProducts(currentUser[userIndex].categories);
    console.log("currentUser", currentUser);
    sessionStorage.clear();
    sessionStorage.setItem("userDetails", JSON.stringify(currentUser));
    actions.assignData("userDetails", currentUser);
    actions.assignData("notification", notification);
    login.categories = currentUser[userIndex].categories;
    actions.assignData("login", login);
  };

  const emptyCart = () => {
    const data = sessionStorage.getItem("userDetails");
    let currentUser = JSON.parse(data);
    notification = 0;
    let userIndex;
    currentUser.map((user, index) =>
      user.isLoggedIn
        ? user.categories.map((purchase) =>
            purchase.isChecked
              ? purchase.products.map(
                  (purchaseItem) => (
                    (purchaseItem.addedToCart = 0),
                    (purchaseItem.quantityPrice =
                      purchaseItem.addedToCart * purchaseItem.mrp),
                    (userIndex = index)
                  )
                )
              : null
          )
        : null
    );
    setProducts(currentUser[userIndex].categories);
    console.log("currentUser", currentUser);
    sessionStorage.clear();
    sessionStorage.setItem("userDetails", JSON.stringify(currentUser));
    actions.assignData("userDetails", currentUser);
    actions.assignData("notification", notification);
  };
  let totalAmount = 0;
  let history = useHistory();
  return (
    <div className="cart">
      <button
        className="backButton"
        onClick={() => {
          history.push("/layout/products");
        }}
      >
        Back to products
      </button>
      <h3>Shopping Cart</h3>
      <div className="shoppingCart">
        <div className="displayCart">
          <div className="cartTitle">
            <span className="totalNum">
              You have {notification} items in your cart
            </span>
            <button className="backButton" onClick={emptyCart}>
              clear shopping cart
            </button>
          </div>
          <div className="cartTable">
            {notification ? (
              <div>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Products</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList &&
                      productList.map((purchaseItem, index) =>
                        purchaseItem.products.map((item) =>
                          item.addedToCart ? (
                            <tr key={index}>
                              <td>
                                <div
                                  className="image"
                                  style={{
                                    backgroundImage: "url(" + item.imgSrc + ")",
                                  }}
                                ></div>
                              </td>
                              <td>{item.name}</td>
                              <td>
                                <button
                                  className="remove"
                                  onClick={() => {
                                    reduceItem(item);
                                  }}
                                >
                                  -
                                </button>
                                {item.addedToCart}
                                <button className="add" onClick={() => addToCart(item)}>
                                  +
                                </button>
                              </td>
                              <td>{item.quantityPrice}</td>
                            </tr>
                          ) : null
                        )
                      )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>Total</td>
                      <td></td>
                      <td></td>
                      <td>
                        {productList &&
                          productList.map((purchaseItem) =>
                            purchaseItem.products.map(
                              (item) =>
                                (totalAmount += parseInt(item.quantityPrice))
                            )
                          ) &&
                          totalAmount}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <div>no products in cart</div>
            )}
          </div>
        </div>
      </div>
          <button className="checkOut"
            onClick={() => {
              history.push("/layout/check-out");
            }}
          >
            CheckOut
          </button>
    </div>
  );
};

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(ShoppingCart);
