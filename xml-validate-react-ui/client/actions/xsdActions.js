import { call, put } from "redux-saga/effects";
import request, { getContextualURL } from "../utils/request";

export const GET_XSD = "GET_XSD";
export const GET_XSD_SUCCESS = "GET_XSD_SUCCESS";
export const GET_XSD_FAIL = "GET_XSD_FAIL";
export const GET_XSD_PROGRESS = "GET_XSD_PROGRESS";
export const GET_XSD_DONE = "GET_XSD_DONE";

export const SELECT_XSD = "SELECT_XSD";
export const SELECT_XSD_SUCCESS = "SELECT_XSD_SUCCESS";
export const SELECT_XSD_FAIL = "SELECT_XSD_FAIL";

export const getXSD = (fileList) => ({
  type: GET_XSD,
  fileList,
});

const getXSDSuccess = (xsd) => ({
  type: GET_XSD_SUCCESS,
  xsd,
});

const getXSDProgress = () => ({
  type: GET_XSD_PROGRESS,
});

const getXSDDone = () => ({
  type: GET_XSD_DONE,
});

const getXSDFail = (err) => ({
  type: GET_XSD_FAIL,
  err,
});

export function* genGetXSD() {
  yield put(getXSDProgress());
  try {
    const xsdResponse = yield call(request, getContextualURL("/validate/xsd"));
    yield put(getXSDSuccess(xsdResponse));
    yield put(getXSDDone());
  } catch (err) {
    yield put(getXSDFail(err));
    yield put(getXSDDone());
  }
}

export const selectXSD = (xsdFile, activeIndex) => ({
  type: SELECT_XSD,
  payload: { xsdFile, activeIndex },
});
