const initialState = {
  tableData: [],
  editDataItemIndex: null,
  editTableDataItem: null,
  deleteDataItemIndex: null,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TABLE_DATA":
      return { ...state, tableData: action.payload };

    case "EDIT_TABLE_DATA_INDEX":
      return { ...state, editDataItemIndex: action.payload };

    case "EDIT_TABLE_DATA_ITEM":
      return { ...state, editTableDataItem: action.payload };

    case "DELETE_TABLE_DATA_INDEX":
      return { ...state, deleteDataItemIndex: action.payload };
    default:
      return state;
  }
};

export default counterReducer;
