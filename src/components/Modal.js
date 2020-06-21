import React from "react";
import "../styles/Modal.scss";
import { bindDispatch } from "../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";

const Modal = (props) => {
  const { actions, onClose } = props;
  const { placeOrder } = actions;

  if (!props.show) {
    return null;
  }
  const dispatchOrder = () => {
    placeOrder();
    onClose();
  };

  console.log("props modallllll", props);
  return (
    <div id="modal">
      <div class="content">Thank you For placing the order</div>
      <div class="actions">
        <button class="toggle-button" onClick={dispatchOrder}>
          OKAY
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(Modal);
