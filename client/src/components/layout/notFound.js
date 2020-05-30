import React, { Fragment } from "react";

const NotFound = () => {
  return (
    <Fragment>
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle"> page not found</i>
      </h1>
      <p className="large">page does not exisit</p>
    </Fragment>
  );
};

export default NotFound;
