import React from "react";
import * as styles from "../styles/login.module.scss";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { bindDispatch } from "../utils";
import { useHistory } from "react-router-dom";
import Input from "./common/Input";
import Button from "./common/Button";
import * as directory from "../utils/RootDirectory";

const Login = (props) => {
  const { reducer, actions } = props;
  const { submitHandler } = actions;
  let { login, error } = reducer;
  let history = useHistory();

  const handleLogin = (event) => {
    const { reducer, actions } = props;
    const { login } = reducer;
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
    <div id={styles.login}>
      <fieldset>
        <legend>ECOMMERCE LOGIN</legend>
        <div className={styles.userInfo}>
          <div>
            <Input
              type="text"
              name="name"
              placeholder="UserName"
              value={login.name}
              onChange={handleLogin}
              onFocus={clearError}
              className={styles.userField}
            />
            <div className={styles.error}>{error.name ? error.name : null}</div>
            <Input
              type="text"
              name="email"
              placeholder="Email Id"
              value={login.email}
              onChange={handleLogin}
              onFocus={clearError}
              className={styles.userField}
            />
            <div className={styles.error}>
              {error.email ? error.email : null}
            </div>
          </div>
          <div className={styles.submitSection}>
            <Button
              className={styles.submit}
              onClick={() => {
                submitHandler();
                if (!error.name && !error.email) {
                  history.push(directory.LAYOUT);
                }
              }}
            >
              Submit
            </Button>
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
