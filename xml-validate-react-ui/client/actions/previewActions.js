export const REMOVE_FILE = "REMOVE_FILE";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const REMOVE_ITEM_SUCCESS = "REMOVE_ITEM_SUCCESS";
export const UPLOAD_FILE = "UPLOAD_FILE";
export const POPULATE_CONTENT = "POPULATE_CONTENT";
export const SELECT_XML = "SELECT_XML";
export const SELECT_XML_SUCCESS = "SELECT_XML_SUCCESS";

export const removeFile = (file) => ({
  type: REMOVE_FILE,
  file,
});

export const removeItem = (index) => ({
  type: REMOVE_ITEM,
  index,
});

export const removeItemSuccess = (activeIndex, fileList, xmlFile) => ({
  type: REMOVE_ITEM_SUCCESS,
  payload: { activeIndex, fileList, xmlFile },
});

export const uploadFile = (file) => ({
  type: UPLOAD_FILE,
  file,
});

export const populateFileContent = (fileContent, fileName) => ({
  type: POPULATE_CONTENT,
  payload: { fileContent, fileName },
});

export const selectFileInPreview = (xmlFile, fileList, activeIndex) => ({
  type: SELECT_XML,
  payload: { xmlFile, fileList, activeIndex },
});

const selectFileInPreviewSuccess = (xmlFile, fileContent, activeIndex) => ({
  type: SELECT_XML_SUCCESS,
  payload: { xmlFile, fileContent, activeIndex },
});

export function* genReadFile(dispatch, action) {
  const { activeIndex, fileList, xmlFile } = action.payload;
  const reader = new FileReader();

  reader.onload = (e) => {
    const src = e.target.result;
    let xmlContent = src;
    dispatch(selectFileInPreviewSuccess(xmlFile, xmlContent, activeIndex));
  };

  reader.readAsText(fileList[activeIndex]);
}
