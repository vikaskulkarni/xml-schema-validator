import React, { useEffect, useRef } from "react";
import "./fileContentArea.scss";

const populate_rownr = (obj, cntline) => {
  let tmpstr = "";
  for (let i = 1; i <= cntline; i++) {
    tmpstr = tmpstr + i.toString() + "\n";
  }
  obj.value = tmpstr;
};

const input_changed = (obj_txt) => {
  let event = obj_txt;
  obj_txt = obj_txt.target || event;
  let obj_rownr = obj_txt.parentElement.parentElement.getElementsByTagName(
    "textarea"
  )[0];
  let cntline = obj_txt.value.split(/\r\n|\r|\n/).length;
  if (cntline == 0) cntline = 1;
  let tmp_arr = obj_rownr.value.split("\n");
  let cntline_old = parseInt(tmp_arr[tmp_arr.length - 1], 10);
  // if there was a change in line count
  if (cntline != cntline_old) {
    obj_rownr.cols = cntline.toString().length; // new width of txt_rownr
    populate_rownr(obj_rownr, cntline);
    scroll_changed(event);
  }
  selectionchanged(event);
};

const selectionchanged = (obj) => {
  obj = obj.target || obj;
  let substr = obj.value.substring(0, obj.selectionStart).split("\n");
  let row = substr.length;
  let col = substr[substr.length - 1].length;
  let tmpstr = "Row: " + row.toString() + " Col: " + col.toString();
  if (obj.selectionStart != obj.selectionEnd) {
    substr = obj.value
      .substring(obj.selectionStart, obj.selectionEnd)
      .split("\n");
    row += substr.length - 1;
    col = substr[substr.length - 1].length;
    tmpstr += "Row: " + row.toString() + ", Col: " + col.toString();
  }
  obj.parentElement.parentElement.getElementsByTagName(
    "input"
  )[0].value = tmpstr;
};

const keyup = (e) => {
  if (e.keyCode >= 33 && e.keyCode <= 40) selectionchanged(e, e.keyCode);
};

const scroll_changed = (obj_txt) => {
  obj_txt = obj_txt.target || obj_txt;
  let obj_rownr = obj_txt.parentElement.parentElement.getElementsByTagName(
    "textarea"
  )[0];
  scrollsync(obj_txt, obj_rownr);
};

const scrollsync = (obj1, obj2) => {
  // scroll text in object id1 the same as object id2
  obj2.scrollTop = obj1.scrollTop;
};

const FileContentArea = (props) => {
  useEffect(() => {
    input_changed(document.querySelector("#main_content"));
  }, [props.fileContent]);

  const contentArea = useRef();

  const copyToClipBoard = () => {
    contentArea.current.select();
    document.execCommand("copy");
    console.log("copied");
  };

  return (
    <div className="status-style">
      {/* {props.fileContent && !props.formatStatus[props.fileName] && (
        <a href="#" onClick={props.formatXML}>
          Format
        </a>
      )}

      {props.formatStatus[props.fileName] && (
        <a href="#" onClick={props.undoFormat}>
          Undo Format
        </a>
      )} */}

      <div className="status-id no-select">Name</div>
      <div className="status-title ellipsis">{props.fileName}</div>

      <div
        style={{
          fontSize: "1rem",
          borderLeft: "2px solid #BD7189",
          paddingLeft: "5px",
          height: "100%",
        }}
      >
        <textarea className="rownr" rows="22" value="1" readOnly></textarea>
        <span>
          <textarea
            ref={contentArea}
            id="main_content"
            className="txt"
            rows="21"
            cols="100"
            nowrap="nowrap"
            wrap="off"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            onClick={() => selectionchanged(event)}
            onKeyUp={() => keyup(event)}
            onInput={() => input_changed(event)}
            onScroll={() => scroll_changed(event)}
            value={props.fileContent}
            onChange={props.handleTextChange}
          ></textarea>
          <div className="copy-icon" onClick={copyToClipBoard}>
            <i className="fa fa-copy fa-2x"></i>
          </div>
        </span>
        <div className="ip-style">
          <input id="sel_in" value="Row: 1 Col: 0" readOnly />
        </div>
      </div>
    </div>
  );
};

export default FileContentArea;
