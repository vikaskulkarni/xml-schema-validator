import { call, put } from "redux-saga/effects";
import request, { getContextualURL } from "../utils/request";

export const FILE_LIST = "FILE_LIST";
export const HOVER_STATE = "HOVER_STATE";
export const FILE_SELECT = "FILE_SELECT";
export const DRAG_OVER = "DRAG_OVER";
export const UPLOAD_VALIDATE = "UPLOAD_VALIDATE";
export const UPLOAD_VALIDATE_SUCCESS = "UPLOAD_VALIDATE_SUCCESS";
export const UPLOAD_VALIDATE_FAIL = "UPLOAD_VALIDATE_FAIL";
export const UPLOAD_VALIDATE_PROGRESS = "UPLOAD_VALIDATE_PROGRESS";
export const UPLOAD_VALIDATE_DONE = "UPLOAD_VALIDATE_DONE";
export const FORMAT_XML = "FORMAT_XML";
export const UNDO_FORMAT = "UNDO_FORMAT";
export const TEXT_CHANGE = "TEXT_CHANGE";

export const handleTextChange = (evt) => ({
  type: TEXT_CHANGE,
  evt,
});

export const formatXML = () => ({
  type: FORMAT_XML,
});

export const undoFormat = () => ({
  type: UNDO_FORMAT,
});

export const setFileList = (list) => ({
  type: FILE_LIST,
  list,
});

export const setHoverState = (hoverState) => ({
  type: HOVER_STATE,
  hoverState,
});

export const handleFileSelect = (evt) => ({
  type: FILE_SELECT,
  evt,
});

export const handleDragOver = (evt) => ({
  type: DRAG_OVER,
  evt,
});

export const uploadAndValidate = (
  fileList,
  xsdFile,
  contentDirty,
  fileContent
) => ({
  type: UPLOAD_VALIDATE,
  payload: { fileList, xsdFile, contentDirty, fileContent },
});

const uploadAndValidateSuccess = (message) => ({
  type: UPLOAD_VALIDATE_SUCCESS,
  message,
});

const uploadAndValidateFail = (err) => ({
  type: UPLOAD_VALIDATE_FAIL,
  err,
});

const uploadAndValidateProgress = () => ({
  type: UPLOAD_VALIDATE_PROGRESS,
});

const uploadAndValidateDone = () => ({
  type: UPLOAD_VALIDATE_DONE,
});

export function* genUploadAndValidate(action) {
  yield put(uploadAndValidateProgress());
  let { fileList, xsdFile, contentDirty, fileContent } = action.payload;
  const UPLOAD_URL = contentDirty
    ? getContextualURL("/validate/uploadXMLContent")
    : getContextualURL("/validate/uploadSingleXMLFile");

  let formData = {};

  if (contentDirty) formData = fileContent;
  else {
    formData = new FormData();
    formData.append("file", fileList[0]);
  }

  try {
    const uploadResponse = yield call(request, `${UPLOAD_URL}/${xsdFile}`, {
      method: "POST",
      headers: contentDirty
        ? {
            "Content-type": "application/xml",
          }
        : {},
      body: formData,
    });
    yield put(uploadAndValidateSuccess(uploadResponse.data));
    yield put(uploadAndValidateDone());
  } catch (err) {
    yield put(uploadAndValidateFail(err));
    yield put(uploadAndValidateDone());
  }
}
