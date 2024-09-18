import React from "react";

const Square = (props) => {
  return (
    <div
      onClick={props.onClick}
      style={{
        border: "1px solid #000",
        height: "100px",
        width: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        cursor: "pointer",
        backgroundColor: props.value
          ? props.value === "X"
            ? "#f2d7d5"
            : "#d5f5e3"
          : "#fff",
      }}
      className="square">
      {props.value}
    </div>
  );
};

export default Square;
