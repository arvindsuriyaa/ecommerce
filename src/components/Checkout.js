/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Fragment, useEffect } from "react";
import { useHistory } from "react-router";
import * as styles from "../styles/checkOut.module.scss";
import Modal from "./Modal";
import { bindDispatch } from "../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import Button from "./common/Button";
import * as directory from "../utils/RootDirectory";

const Checkout = (props) => {
  let history = useHistory();
  const [show, setShow] = useState(false);
  const { reducer, actions } = props;
  const { notification, login } = reducer;
  const { categories } = login;

  useEffect(() => {
    const data = sessionStorage.getItem("userDetails");
    let currentUser = JSON.parse(data);
    currentUser.map((user, index) =>
      user.isLoggedIn ? (login.categories = user.categories) : null
    );
    actions.assignData("login", login);
  }, []);

  let total = 0;
  return (
    <Fragment>
      <div className={styles.checkOutContainer}>
        <div className={show ? styles.fade : styles.show}>
          <Button
            className={styles.backToCart}
            onClick={() => {
              history.push(directory.SHOPPING_CART);
            }}
          >
            Back to cart
          </Button>
          <div
            className={styles.checkOut}
            onClick={() => {
              setShow(false);
            }}
          >
            <div className={styles.orderStatus}>
              <div className={styles.orderTitle}>Order Summary</div>
              <div className={styles.totalItems}>
                You have {notification} items in your shopping cart
              </div>
            </div>
            <div className={styles.orderDetails}>
              {categories &&
                categories.map((purchaseList) => {
                  return purchaseList.products.map((product) =>
                    product.addedToCart ? (
                      <div>
                        <div className={styles.checkOutItems}>
                          <span>
                            {product.addedToCart} X {product.name}
                          </span>
                          <span>$ {product.quantityPrice}</span>
                        </div>
                        <hr className={styles.bottomLine} />
                      </div>
                    ) : null
                  );
                })}
              <div className={styles.totalValue}>
                <span>Total Price</span>
                <span>
                  ${" "}
                  {categories &&
                    categories.map((purchaseList) =>
                      purchaseList.products.map((product) =>
                        product.addedToCart
                          ? (total += product.quantityPrice)
                          : null
                      )
                    ) &&
                    total}
                </span>
              </div>
            </div>
          </div>
          <Button
            className={styles.placeOrder}
            onClick={() => {
              setShow(true);
            }}
          >
            Place Order
          </Button>
        </div>

        <Modal
          show={show}
          onClose={() => {
            setShow(false);
            history.push(directory.DASHBOARD);
          }}
        />
      </div>
    </Fragment>
  );
};

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(Checkout);
