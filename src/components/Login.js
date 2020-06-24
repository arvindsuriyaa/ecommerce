import React from "react";
import "../styles/login.scss";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { bindDispatch } from "../utils";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  console.log("appsProps", props);
  const { reducer, actions } = props;
  const { submitHandler } = actions;
  let { login, error } = reducer;
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
            <button
              onClick={() => {
                submitHandler();
                if (!error.name && !error.email) {
                  history.push(`./Layout`);
                }
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(Login);
