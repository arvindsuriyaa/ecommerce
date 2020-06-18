import React, { useState, Fragment } from "react";
import { useHistory } from "react-router";
import "../styles/checkOut.scss";
import Modal from "./Modal";
import { bindDispatch } from "../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";

const Checkout = (props) => {
  let history = useHistory();
  const [show, setShow] = useState(false);
  const { reducer } = props;
  const { notification, login } = reducer;
  const { categories } = login;
  console.log("checkout props", props);
  let total = 0;
  return (
    <Fragment>
      <div
        className="checkOutContainer"
        style={show ? { opacity: 0.4 } : { opacity: 1 }}
      >
        <button
          onClick={() => {
            history.push("/layout/shopping-cart");
          }}
        >
          Back to cart
        </button>
        <div
          className="checkOut"
          onClick={() => {
            setShow(false);
          }}
        >
          <div className="orderStatus">
            <div>Order Summary</div>
            <div>you have {notification} items in your shopping cart</div>
          </div>
          <div className="orderDetails">
            {categories &&
              categories.map((purchaseList) =>
                purchaseList.products.map((product) =>
                  product.addedToCart ? (
                    <div className="CheckoutItems">
                      <span>
                        {product.addedToCart} X {product.name}
                      </span>
                      <span>$ {product.quantityPrice}</span>
                    </div>
                  ) : null
                )
              )}
            <hr />
            <div className="totalValue">
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
        <button
          onClick={() => {
            setShow(true);
          }}
        >
          Place Order
        </button>
      </div>

      <Modal
        show={show}
        onClose={() => {
          setShow(false);
          history.push("/layout/products");
        }}
      />
    </Fragment>
  );
};

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(Checkout);

// export default Checkout;
