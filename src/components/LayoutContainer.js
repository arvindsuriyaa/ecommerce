import React from "react";
import Header from "./Header";
const LayoutContainer = (props) => {
  return (
    <div id="wrapper">
      <Header logout={props.logout} />
      {props.children}
    </div>
  );
};

export default LayoutContainer;
