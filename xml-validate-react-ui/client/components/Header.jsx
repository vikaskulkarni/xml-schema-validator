import React from "react";
import "./header.scss";

const Header = (props) => (
  <div className="">
    <nav className="navbar-expand-lg">
      <h4>
        <span>XML Schema Validator</span>{" "}
      </h4>
    </nav>
    <div className="box">
      <div className="box-1"></div>
      <div className="box-2">
        <div className="crosshair">
          {props.fileList.length >= 1 && props.xsdFile && (
            <a
              href="#"
              onClick={() =>
                props.uploadAndValidate(
                  props.fileList,
                  props.xsdFile,
                  props.contentDirty,
                  props.fileContent
                )
              }
            >
              <strong>
                <span>Upload &amp; Validate</span>
              </strong>
            </a>
          )}

          {!(props.fileList.length >= 1 && props.xsdFile) && (
            <strong>
              <div style={{ color: "#8d8d8d", padding: "10px" }}>
                Upload &amp; Validate
              </div>
            </strong>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default Header;
