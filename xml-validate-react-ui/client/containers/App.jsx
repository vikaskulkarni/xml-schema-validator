import React, { Suspense, Fragment } from "react";
import "./styles.scss";
import {
  FileUploadCtr,
  PreviewWithActionsCtr,
  FileContentAreaCtr,
  HeaderCtr,
  XSDFilesCtr,
} from "./CombinedContainers";

const App = () => {
  return (
    <Fragment>
      <div className="container">
        <HeaderCtr />

        <div>
          <div className="row pt-2">
            <div className="col-xs-12 col-sm-6 col-md-3">
              <FileUploadCtr />
              <hr />
              <Suspense fallback={<span>Loading XSD Files</span>}>
                <XSDFilesCtr />
              </Suspense>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-9">
              <FileContentAreaCtr />
            </div>
          </div>
          <div className="row my-3">
            <div className="col-xs-12 col-sm-12 col-md-12">
              <PreviewWithActionsCtr />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
