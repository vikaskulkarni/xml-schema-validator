import {
  GET_XSD_SUCCESS,
  SELECT_XSD,
  GET_XSD_DONE,
  GET_XSD_PROGRESS,
} from "../actions/xsdActions";

const xsdReducer = (
  state = { xsds: [], xsdFile: "", activeIndex: -1 },
  action
) => {
  switch (action.type) {
    case GET_XSD_SUCCESS:
      return {
        ...state,
        xsds: action.xsd.data,
      };
    case SELECT_XSD:
      return state.activeIndex === action.payload.activeIndex
        ? {
            ...state,
            xsdFile: "",
            activeIndex: -1,
          }
        : {
            ...state,
            xsdFile: action.payload.xsdFile,
            activeIndex: action.payload.activeIndex,
          };
    case GET_XSD_PROGRESS:
      return { ...state, xsdFetchInProgress: true };
    case GET_XSD_DONE:
      return { ...state, xsdFetchInProgress: false };
    default:
      return state;
  }
};

export default xsdReducer;
