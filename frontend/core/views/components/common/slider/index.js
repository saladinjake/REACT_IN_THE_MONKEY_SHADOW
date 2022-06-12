import React from "react";
import ReactDOM from "react-dom";
import Slider from "./Slider";

function SlideOut() {
  return (
    <>
      <h2>Slider</h2>
      <Slider height="300px" auto speed={3000}>
        <div style={{ width: "100%", height: "300px", background: "pink" }}>
          1
        </div>
        <div style={{ width: "100%", height: "300px", background: "beige" }}>
          2
        </div>
        <div style={{ width: "100%", height: "300px", background: "skyblue" }}>
          3
        </div>
        <div style={{ width: "100%", height: "300px", background: "yellow" }}>
          4
        </div>
        <div style={{ width: "100%", height: "300px", background: "white" }}>
          5
        </div>
        <div style={{ width: "100%", height: "300px", background: "cyan" }}>
          6
        </div>
      </Slider>
    </>
  );
}

export default  SlideOut;
