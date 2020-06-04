import { connect } from "react-redux";
import FileUpload from "../components/FileUpload";
import {
  setFileList,
  setHoverState,
  handleFileSelect,
  handleDragOver,
  uploadAndValidate,
  formatXML,
  undoFormat,
  handleTextChange,
} from "../actions/fileUploadActions";
import PreviewWithActions from "../components/PreviewWithActions";
import {
  removeFile,
  removeItem,
  uploadFile,
  populateFileContent,
  selectFileInPreview,
} from "../actions/previewActions";
import FileContentArea from "../components/FileContentArea";
import FilePreview from "../components/FilePreview";
import Header from "../components/Header";
import XSDFiles from "../components/XSDFiles";
import { getXSD, selectXSD } from "../actions/xsdActions";

export const FileUploadCtr = connect(
  (state) => ({
    fileList: state.fileUploadReducer.fileList,
    multiple: state.fileUploadReducer.multiple,
    name: state.fileUploadReducer.name,
    maxSize: state.fileUploadReducer.maxSize,
    label: state.fileUploadReducer.label,
    hoverState: state.fileUploadReducer.hoverState,
  }),
  { setFileList, setHoverState, handleFileSelect, handleDragOver }
)(FileUpload);

export const HeaderCtr = connect(
  (state) => ({
    fileList: state.fileUploadReducer.fileList,
    fileName: state.fileUploadReducer.fileName,
    contentDirty: state.fileUploadReducer.contentDirty,
    fileContent: state.fileUploadReducer.fileContent,
    xsdFile: state.xsdReducer.xsdFile,
  }),
  { uploadAndValidate }
)(Header);

export const PreviewWithActionsCtr = connect(
  (state) => ({
    fileList: state.fileUploadReducer.fileList,
  }),
  { removeFile, uploadFile, populateFileContent }
)(PreviewWithActions);

export const FileContentAreaCtr = connect(
  (state) => ({
    fileContent: state.fileUploadReducer.fileContent,
    fileName: state.fileUploadReducer.fileName,
    formatStatus: state.fileUploadReducer.formatStatus,
  }),
  { formatXML, undoFormat, handleTextChange }
)(FileContentArea);

export const FilePreviewCtr = connect(
  (state) => ({
    fileContent: state.fileUploadReducer.fileContent,
    activeIndex: state.fileUploadReducer.activeIndex,
    fileName: state.fileUploadReducer.fileName,
    fileList: state.fileUploadReducer.fileList,
    details: state.fileUploadReducer.details,
    uploadInProgress: state.fileUploadReducer.uploadInProgress,
  }),
  { selectFileInPreview, removeItem }
)(FilePreview);

export const XSDFilesCtr = connect(
  (state) => ({
    xsds: state.xsdReducer.xsds,
    xsdFile: state.xsdReducer.xsdFile,
    activeIndex: state.xsdReducer.activeIndex,
    xsdFetchInProgress: state.xsdReducer.xsdFetchInProgress,
  }),
  { getXSD, selectXSD }
)(XSDFiles);

// THIS FILE CAN BE USED TO DEFINE ALL THE DISPLAY CONTAINERS THAT WRAPS THE COMPONENTS
