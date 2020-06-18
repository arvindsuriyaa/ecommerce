import React from "react";
import "../styles/login.scss";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { bindDispatch } from "../utils";
import { useHistory } from "react-router-dom";
import { productSeed } from "../utils/productSeed";

const Login = (props) => {
  console.log("appsProps", props);
  const { reducer } = props;
  const { login, error } = reducer;
  let history = useHistory();

  const handleLogin = (event) => {
    const { reducer, actions } = props;
    const { login } = reducer;
    console.log("asd");
    actions.assignData("login", {
      ...login,
      [event.target.name]: event.target.value,
    });
    
  };

  function pushData(props) {
    const { reducer, actions } = props;
    let { userDetails, login, error } = reducer;
    let { id, categories, isLoggedIn } = login;
    let newId = id + 1;
    login.id = newId;
    login.categories = productSeed;

    actions.assignData("login", { ...login });
    console.log(isLoggedIn);
    login.isLoggedIn = !isLoggedIn;
    userDetails = [...userDetails, { ...login }];
    console.log("userDetails", userDetails);
    sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
    error = {};
    actions.assignData("error", error);
    actions.assignData("userDetails", userDetails);
    login.name = "";
    login.email = "";
    login.categories = [];
    login.isLoggedIn = isLoggedIn;
    actions.assignData("login", { ...login });
    console.log("userDetails", userDetails);
    history.push(`./Layout`);
  }

  function validateEmail(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
  }
  function validateUser() {
    const { reducer } = props;
    let { login } = reducer;
    const { name } = login;
    if (!name.length) {
      return false;
    } else {
      return true;
    }
  }

  const handleSubmit = () => {
    const { reducer, actions } = props;
    let { userDetails, login, error } = reducer;
    const { email, isLoggedIn } = login;
    debugger
    if (!validateUser()) {
      error.name = "This Field is Mandatory";
      actions.assignData("error", error);
    } else if (error.name) {
      error.name = "";
      actions.assignData("error", error);
    }
    if (!email.length) {
      error.email = "This Field is Mandatory";
      actions.assignData("error", error);
      return;
    }
    if (validateEmail(login.email) && validateUser()) {
      if (!userDetails.length) {
        pushData(props);
        return;
      } else {
        let duplicateCheck = false;
        let indexValue;
        userDetails.map((user, index) =>
          user["email"] === login["email"]
            ? ((indexValue = index), (duplicateCheck = true))
            : null
        );
        if (duplicateCheck) {
          // debugger;
          const data = sessionStorage.getItem("userDetails");
          let currentUser = JSON.parse(data);
          let newId = indexValue + 1;
          login.id = newId;
          login.isLoggedIn = true;
          currentUser.map((item, index) =>
            login.email === item.email
              ? ((login.categories = item.categories),
                (login.selectAll = item.selectAll))
              : null
          );

          actions.assignData("login", login);
          userDetails.splice(indexValue, 1, login);
          actions.assignData("userDetails", userDetails);
          sessionStorage.clear()
          sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
          login.name = "";
          login.email = "";
          login.categories = [];
          login.isLoggedIn = !isLoggedIn;
          actions.assignData("login", { ...login });
          console.log("userDetails", userDetails);
          history.push(`./Layout`);
        } else {
          pushData(props);
        }
      }
    } else {
      if (!validateEmail(login.email)) {
        error.email = "Enter a vaild Mail ID";
        actions.assignData("error", error);
      }
    }
  };

  const clearError = (event) => {
    const { reducer, actions } = props;
    let { error } = reducer;
    let name = event.target.name;
    error[name] = "";
    actions.assignData("error", error);
  };

  return (
    <div id="login">
      <fieldset>
        <legend>ECOMMERCE LOGIN</legend>
        <div className="userInfo">
          <div>
            <input
              type="text"
              name="name"
              placeholder="UserName"
              value={login.name}
              onChange={handleLogin}
              onFocus={clearError}
            />
            <div className="error">{error.name ? error.name : null}</div>
            <input
              type="text"
              name="email"
              placeholder="EmailId"
              value={login.email}
              onChange={handleLogin}
              onFocus={clearError}
            />
            <div className="error">{error.email ? error.email : null}</div>
          </div>
          <div className="submitSection">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

const mapStateToProps = createSelector(
  (state) => state.reducer, // input selector
  (reducer) => ({ reducer }) // app is the value of the input selector
);

export default connect(mapStateToProps, bindDispatch)(Login);
