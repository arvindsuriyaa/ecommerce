import React, { useEffect, useState } from "react";
import * as styles from "../styles/products.module.scss";
import Categories from "./Categories";
import ShowProducts from "./ShowProducts";
import { bindDispatch } from "../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";

const Products = (props) => {
  const { reducer, actions } = props;
  const { login } = reducer;
  const [stateHandler, setState] = useState({});

  useEffect(() => {
    const data = sessionStorage.getItem("userDetails");
    let currentUser = JSON.parse(data);
    currentUser.map((item, index) => {
      if (item.isLoggedIn) {
        setState(currentUser[index]);

        return actions.assignData("login", {
          ...login,
          categories: currentUser[index].categories,
        });
      }
    });
  }, []);

  const { categories } = stateHandler;
  return (
    <div id={styles.products}>
      <Categories categories={categories} />
      <ShowProducts categories={categories} />
    </div>
  );
};

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(Products);
