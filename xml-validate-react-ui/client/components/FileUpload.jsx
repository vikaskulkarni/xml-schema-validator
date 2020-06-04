import React, { Component } from "react";
import styles from "./styles";
import "./fileUpload.scss";

class FileUpload extends Component {
  handleDragOver = (e) => {
    if ("preventDefault" in e) {
      e.stopPropagation();
      e.preventDefault();
    }
    // const hoverState = () => {
    //   if (e.type === "dragover") {
    //     styles.hover;
    //   } else {
    //     null;
    //   }
    // };
    // this.props.setHoverState({
    //   hoverState,
    // });
  };

  selectFile = (e) => {
    e.preventDefault();
    this.input.click(e);
  };

  render() {
    const { maxSize, name, multiple, label } = this.props;

    const dragClasses = [styles.fileDrag, this.props.hoverState]
      .join(" ")
      .trim();

    const fileNames = () => {
      let retVal = "No XML selected";
      if (this.props.fileList.length > 1) {
        retVal = `${this.props.fileList.length} Files`;
      } else if (this.props.fileList.length === 1) {
        retVal = this.props.fileList[0].name;
      }

      return retVal;
    };

    return (
      <div>
        <input type="hidden" name={`${name}:maxSize`} value={maxSize} />
        <div>
          <div
            className={dragClasses}
            onDragOver={this.handleDragOver}
            onDragLeave={this.handleDragOver}
            onDrop={this.props.handleFileSelect}
          >
            <div className={styles.inputWrapper}>
              <input
                type="file"
                accept="text/xml"
                tabIndex="-1"
                ref={(x) => (this.input = x)}
                className={styles.input}
                name={name}
                multiple={multiple}
                onChange={this.props.handleFileSelect}
              />
              <div className={styles.inputCover}>
                <button
                  className={`${styles.button}`}
                  type="button"
                  onClick={this.selectFile}
                >
                  {label}
                </button>
              </div>
              <div className={styles.fileName}>{fileNames()}</div>
            </div>
            <span className={styles.helpText}>Or Drop a file here</span>
          </div>
        </div>
      </div>
    );
  }
}

export default FileUpload;
