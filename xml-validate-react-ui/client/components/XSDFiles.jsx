import React, { useEffect, Fragment } from "react";
import "./xsdFiles.scss";
import Loader from "./Loader";

const XSDFiles = (props) => {
  useEffect(() => {
    props.getXSD();
  }, []);

  return (
    <div data-xml-id="striped-table" style={{ fontSize: "1rem" }}>
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="text-center">
              Select XSD File ({props.xsds.length})
              <div style={{ fontSize: "0.9rem", color: "#676767" }}>
                {props.xsdFile ? props.xsdFile : "No XSD Selected"}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.xsdFetchInProgress && (
            <Fragment>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td>
                  <Loader />
                </td>
              </tr>
              <tr>
                <td></td>
              </tr>
            </Fragment>
          )}
          {props.xsds.sort().map((element, index) => (
            <tr
              style={
                props.activeIndex === index
                  ? { background: "#e6cf8b", color: "#5E3A00" }
                  : {}
              }
              key={`${element}_${index}`}
              onClick={() => props.selectXSD(element, index)}
            >
              <td>{element}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default XSDFiles;
