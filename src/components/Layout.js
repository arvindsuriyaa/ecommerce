import React, { useEffect, useState } from "react";
import "../styles/layout.scss";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { Link, NavLink } from "react-router-dom";
import { bindDispatch } from "../utils";
import Header from "./Header";
import LayoutContainer from "./LayoutContainer";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";
import Products from "./Products";
import Checkout from "./Checkout";
import Login from "./Login";

const Layout = (props) => {
  const { reducer, actions } = props;
  const { login } = reducer;
  console.log("props jsjkaskjadkljaskl", props);
  let history = useHistory();
  const [stateHandler, setState] = useState({});
  useEffect(() => {
    const data = sessionStorage.getItem("userDetails");
    let currentUser = JSON.parse(data);
    currentUser.map((item, index) => {
      if (item.isLoggedIn) {
        setState(currentUser[index]);
        console.log("currentUserrr", currentUser[index]);
        return actions.assignData("login", {
          ...login,
          categories: currentUser[index].categories,
        });
      }
    });
  }, []);
  const logout = () => {
    const data = sessionStorage.getItem("userDetails");
    let currentUser = JSON.parse(data);
    currentUser.map((item) =>
      item.isLoggedIn ? (item.isLoggedIn = false) : null
    );
    sessionStorage.clear();
    console.log("Logout", currentUser);
    actions.assignData("userDetails", currentUser);
    sessionStorage.setItem("userDetails", JSON.stringify(currentUser));
    history.push(`/`);
  };
  return (
    <Router>
      <LayoutContainer logout={() => logout()}>
        <Switch>
          <Route
            exact
            strict
            path="/layout/products"
            render={() => <Products state={stateHandler} />}
          />
          <Route
            path="/layout/shopping-cart"
            render={() => <ShoppingCart state={stateHandler} />}
          />
          <Route path="/layout/check-out" render={() => <Checkout  state={stateHandler} />}/>
          <Redirect to="/layout/products"></Redirect>
        </Switch>
      </LayoutContainer>
    </Router>
  );
};
const mapStateToProps = createSelector(
  (state) => state.reducer, // input selector
  (reducer) => ({ reducer }) // app is the value of the input selector
);

export default connect(mapStateToProps, bindDispatch)(Layout);
