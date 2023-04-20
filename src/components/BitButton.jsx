import React from "react";
import "./BitButton.scss";
export default function BitButton(props) {
  function downloadFile(e) {
    window.open(props.url);
  }
  return (
    <button
      value="download"
      className="bitbutton"
      style={{ fontSize: "1.5em" }}
      onClick={downloadFile}
    >
      {props.children}
    </button>
  );
}
