import React, { useEffect, useState } from "react";
import styles from "./styles";
import "./filePreview.scss";
import { getContextualURL } from "../utils/request";
import Loader from "./Loader";

const FilePreview = (props) => {
  const classes = [styles.previewItem].join(" ").trim();

  const getValidationResponse = (res) => {
    return !res.valid ? (
      <span className="error">
        [Error] <strong>{props.details.valid.message}</strong> [Line]{" "}
        <strong>{props.details.valid.lineNumber}</strong> [Col]{" "}
        <strong>{props.details.valid.columnNumber}</strong>
      </span>
    ) : (
      <span className="success">
        [Success] <strong>{props.details.valid.message}</strong>
      </span>
    );
  };

  return (
    <div
      className={`${classes}`}
      onClick={() => {
        props.selectFileInPreview(props.file.name, props.fileList, props.index);
      }}
      style={
        props.activeIndex === props.index
          ? { background: "#e6cf8b", color: "#5E3A00" }
          : {}
      }
    >
      <div
        style={{ paddingLeft: "0.9rem" }}
        className={`${styles.fileNameStretch} col-xs-12 col-sm-6 col-md-4`}
      >
        {props.file.name}
      </div>
      {props.uploadInProgress && <Loader text="Validating..." />}
      <div className="validationMessage col-xs-12 col-sm-6 col-md-6">
        {props.details.valid.message &&
          getValidationResponse(props.details.valid)}
      </div>
      <div className="col-xs-12 col-sm-6 col-md-2">
        {props.details.valid.message && (
          <a href={getContextualURL(props.details.fileDownloadUri)}>Download</a>
        )}
      </div>
      <button
        className={`${styles.button}`}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          props.removeItem(props.index);
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default FilePreview;
