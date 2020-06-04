import {
  FILE_LIST,
  HOVER_STATE,
  FILE_SELECT,
  DRAG_OVER,
  UPLOAD_VALIDATE_SUCCESS,
  FORMAT_XML,
  UNDO_FORMAT,
  TEXT_CHANGE,
  UPLOAD_VALIDATE_PROGRESS,
  UPLOAD_VALIDATE_DONE,
} from "../actions/fileUploadActions";
import {
  REMOVE_ITEM,
  POPULATE_CONTENT,
  SELECT_XML_SUCCESS,
  REMOVE_ITEM_SUCCESS,
  SELECT_XML,
} from "../actions/previewActions";
import format from "xml-formatter";

const initialState = {
  fileName: "Select XML",
  fileList: [],
  multiple: false,
  name: "xml-upload",
  maxSize: 300000,
  label: "Select XML",
  hoverState: {},
  fileContent: "",
  origFileContent: "",
  activeIndex: 0,
  formatStatus: {},
  details: { valid: {} },
  contentDirty: false,
  uploadInProgress: false,
};

const fileUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE_LIST:
      return {
        ...state,
        fileList: action.list,
      };
    case HOVER_STATE:
      return {
        ...state,
        hoverState: action.hoverState,
      };

    case FILE_SELECT:
      state = initialState;
      const evt = action.evt;
      if ("preventDefault" in evt) {
        evt.stopPropagation();
        evt.preventDefault();
      }
      const hoverState = evt.type === "dragover" ? "hover" : "";

      const files = evt.target.files || evt.dataTransfer.files;
      const fileList = Object.keys(files).map((file) => files[file]);
      evt.target.value = "";
      return {
        ...state,
        fileList,
        hoverState,
        activeIndex: state.activeIndex,
      };
    case REMOVE_ITEM:
      let modifiedFileList = [...state.fileList];
      modifiedFileList.splice(action.index, 1);
      let activeIndex =
        modifiedFileList.length > action.index
          ? action.index
          : modifiedFileList.length - 1;
      return {
        ...state,
        fileList: modifiedFileList,
        fileContent: "",
        fileName: "Select XML",
        activeIndex,
      };
    case POPULATE_CONTENT:
      return {
        ...state,
        fileContent: action.payload.fileContent,
        fileName: action.payload.fileName,
      };
    case UPLOAD_VALIDATE_SUCCESS:
      return {
        ...state,
        details: action.message,
      };
    case UPLOAD_VALIDATE_PROGRESS:
      return {
        ...state,
        uploadInProgress: true,
      };
    case UPLOAD_VALIDATE_DONE:
      return {
        ...state,
        uploadInProgress: false,
      };
    case SELECT_XML_SUCCESS:
      return {
        ...state,
        fileName: action.payload.xmlFile,
        fileContent: action.payload.fileContent,
        activeIndex: action.payload.activeIndex,
      };
    case FORMAT_XML:
      let formatStatus = { ...state.formatStatus };
      formatStatus[state.fileName] = true;
      return {
        ...state,
        fileContent: format(state.fileContent),
        origFileContent: state.fileContent,
        formatStatus,
      };
    case UNDO_FORMAT:
      let undoFormatStatus = { ...state.formatStatus };
      undoFormatStatus[state.fileName] = false;
      return {
        ...state,
        fileContent: state.origFileContent,
        formatStatus: undoFormatStatus,
      };
    case TEXT_CHANGE:
      return {
        ...state,
        fileContent: action.evt.target.value,
        contentDirty: true,
      };
    default:
      return state;
  }
};

export default fileUploadReducer;
