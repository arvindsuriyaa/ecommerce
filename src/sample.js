import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { bindDispatch } from "./utils";
// import { assignData } from "./store/actions/app";

function App(props) {
  console.log("APPPROPS", props);
  const { reducer } = props;
  
  const changeField = async (event) => {
    const { reducer, actions } = props;

    // actions.assignData("data", { ...reducer.data, [ event.target.name]: event.target.value });//(For updating a specific key value pair in a grouped object)
    actions.assignData("field",  event.target.value );//(For Updating single key value pair under no grouped object case .)
    };

  return (
    <div className="App">
      <h1>welcome</h1>
      <input
        type="text"
        name="field"
        value={reducer.field}
        onChange={changeField}
      />
    </div>
  );
}

const mapStateToProps = createSelector(
  (state) => state.reducer, // input selector
  (reducer) => ({ reducer }) // app is the value of the input selector
);

export default connect(mapStateToProps, bindDispatch)(App);
