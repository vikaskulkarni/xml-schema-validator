import { takeLatest } from "redux-saga/effects";
import {
  genUploadAndValidate,
  UPLOAD_VALIDATE,
} from "../actions/fileUploadActions";
import { GET_XSD, genGetXSD } from "../actions/xsdActions";
import { genReadFile, SELECT_XML } from "../actions/previewActions";

export function* watchSagas(dispatch) {
  console.log("");
  yield takeLatest(UPLOAD_VALIDATE, genUploadAndValidate);
  yield takeLatest(GET_XSD, genGetXSD);
  yield takeLatest(SELECT_XML, genReadFile, dispatch);
}
