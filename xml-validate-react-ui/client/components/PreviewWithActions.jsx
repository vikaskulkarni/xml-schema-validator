import React, { useEffect } from "react";
import { FilePreviewCtr } from "../containers/CombinedContainers";

const PreviewWithActions = (props) => {
  useEffect(
    (data = props.fileList[0]) => {
      if (!data) {
        return;
      }
      const reader = new FileReader();

      const type = () => {
        if (data.type.match("text/xml")) {
          return "text";
        } else {
          return data.type;
        }
      };

      reader.onload = (e) => {
        const src = e.target.result;
        //setLoading(false);
        props.populateFileContent(src, data.name);
      };

      if (type() === "text") {
        reader.readAsText(data);
      } else {
        //setLoading(false);
      }
    },
    [props.fileList]
  );

  return props.fileList.map((file, index) => {
    return <FilePreviewCtr key={index} index={index} file={file} />;
  });
};

export default PreviewWithActions;
