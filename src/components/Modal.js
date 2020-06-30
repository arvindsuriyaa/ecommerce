import React from "react";
import * as styles from "../styles/Modal.module.scss";
import { bindDispatch } from "../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import Button from "./common/Button";

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

  return (
    <div id={styles.modal}>
      <div className={styles.content}>Thank you For placing the order</div>
      <div className={styles.actions}>
        <Button className={styles.toggleButton} onClick={dispatchOrder}>
          OKAY
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(Modal);
