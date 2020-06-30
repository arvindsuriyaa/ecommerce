import React, { useState, useEffect, useRef } from "react";
import * as styles from "../styles/shoppingCart.module.scss";
import { useHistory } from "react-router";
import { bindDispatch } from "../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import Button from "./common/Button";
import * as directory from "../utils/RootDirectory";

const ShoppingCart = (props) => {
  const { actions, reducer } = props;
  const { addToCart, reduceItem, placeOrder } = actions;
  let { notification, login } = reducer;
  const [productList, setProducts] = useState([]);
  const [userPosition, setUserPosition] = useState(null);
  let indice = useRef(null);

  useEffect(() => {
    const data = sessionStorage.getItem("userDetails");
    let currentUser = JSON.parse(data);
    currentUser.map((user, index) =>
      user.isLoggedIn
        ? (setProducts(user.categories),
          (login.categories = user.categories),
          (indice.current = index))
        : null
    );
    setUserPosition(indice.current);
    actions.assignData("login", login);
  }, []);

  const placeItem = (product) => {
    addToCart(product);
    const data = sessionStorage.getItem("userDetails");
    let currentUser = JSON.parse(data);
    setProducts(currentUser[userPosition].categories);
  };

  const removeItem = (product) => {
    reduceItem(product);
    const data = sessionStorage.getItem("userDetails");
    let currentUser = JSON.parse(data);
    setProducts(currentUser[userPosition].categories);
  };

  const emptyCart = () => {
    placeOrder();
    const data = sessionStorage.getItem("userDetails");
    let currentUser = JSON.parse(data);
    setProducts(currentUser[userPosition].categories);
  };

  let totalAmount = 0;
  let history = useHistory();
  return (
    <div className={styles.cart}>
      <Button
        className={styles.backButton}
        onClick={() => {
          history.push(directory.DASHBOARD);
        }}
      >
        Back to products
      </Button>
      <h3>Shopping Cart</h3>
      <div className={styles.shoppingCart}>
        <div className={styles.displayCart}>
          <div className={styles.cartTitle}>
            <span className={styles.totalNum}>
              You have {notification} items in your cart
            </span>
            <Button className={styles.backButton} onClick={emptyCart}>
              clear shopping cart
            </Button>
          </div>
          <div className={styles.cartTable}>
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
                      productList.map((purchaseItem, index) => {
                        if (purchaseItem.isChecked) {
                          return purchaseItem.products.map((item) =>
                            item.addedToCart ? (
                              <tr key={index}>
                                <td>
                                  <div
                                    className={styles.image}
                                    style={{
                                      backgroundImage:
                                        "url(" + item.imgSrc + ")",
                                    }}
                                  ></div>
                                </td>
                                <td>{item.name}</td>
                                <td>
                                  <Button
                                    className={styles.remove}
                                    onClick={() => {
                                      removeItem(item);
                                    }}
                                  >
                                    -
                                  </Button>
                                  {item.addedToCart}
                                  <Button
                                    className={styles.add}
                                    onClick={() => {
                                      placeItem(item);
                                    }}
                                  >
                                    +
                                  </Button>
                                </td>
                                <td>$ {item.quantityPrice}</td>
                              </tr>
                            ) : null
                          );
                        }
                      })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>Total Price</td>
                      <td></td>
                      <td></td>
                      <td>
                        ${" "}
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
              <div className={styles.status}>ⓘ No Products in cart</div>
            )}
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          history.push(directory.CHECKOUT);
        }}
        className={notification ? styles.checkOut : styles.hide}
      >
        CheckOut
      </Button>
    </div>
  );
};

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(ShoppingCart);
