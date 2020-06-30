import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import LayoutContainer from "./components/LayoutContainer";
import ShoppingCart from "./components/ShoppingCart";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import * as directory from "./utils/RootDirectory";

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={directory.LOGIN} component={Login} />
        <Route path={directory.LAYOUT}>
          <LayoutContainer>
            <Switch>
              <Route
                exact
                strict
                path={directory.DASHBOARD}
                component={Products}
              />
              <Route path={directory.SHOPPING_CART} component={ShoppingCart} />
              <Route path={directory.CHECKOUT} component={Checkout} />
              <Redirect to={directory.DASHBOARD}></Redirect>
            </Switch>
          </LayoutContainer>
        </Route>
      </Switch>
    </Router>
  );
};

export default Root;
