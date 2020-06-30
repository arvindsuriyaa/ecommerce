import React, { Fragment } from "react";

const Input = (props) => {
  return (
    <Fragment>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onFocus={props.onFocus}
        className={props.className}
        checked={props.checked}
      />
    </Fragment>
  );
};

export default Input;
