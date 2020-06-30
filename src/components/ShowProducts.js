import React from "react";
import ProductCard from "./ProductCard";
import * as styles from "../styles/ShowProducts.module.scss";
import { bindDispatch } from "../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
const ShowProducts = (props) => {
  const { reducer } = props;
  const { login } = reducer;
  const { categories } = login;
  return (
    <div id={styles.showProducts}>
      {categories &&
        categories.map((item) =>
          item.isChecked
            ? item.products.map((purchaseItem) => (
                <ProductCard productInfo={purchaseItem} />
              ))
            : null
        )}
    </div>
  );
};
const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(ShowProducts);
