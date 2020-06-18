import React from "react";
import Header from "./Header";
const LayoutContainer = (props) => {
  console.log("asdasdasdasdasdasd", props);
  return (
    <div id="wrapper">
      <Header logout={props.logout} />
      {props.children}
    </div>
  );
};

export default LayoutContainer;
