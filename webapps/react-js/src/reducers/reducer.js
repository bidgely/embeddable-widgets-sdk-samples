const intialState = {
  oauthClient: "",
  apiEndPoint: "",
  accessToken: "",
  csrId: "",
  fuelType: "",
  accountType: "",
  aesKey: "",
  iv: "",
  userId: "",
  widgetResponseObject: "",
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case "CHANGE_FIELD1":
      return {
        ...state,
        oauthClient: action.value,
      };
    case "CHANGE_FIELD2":
      return {
        ...state,
        apiEndPoint: action.value,
      };
    case "CHANGE_FIELD3":
      return {
        ...state,
        accessToken: action.value,
      };
    case "CHANGE_FIELD4":
      return {
        ...state,
        csrId: action.value,
      };
    case "CHANGE_FIELD5":
      return {
        ...state,
        fuelType: action.value,
      };
    case "CHANGE_FIELD6":
      return {
        ...state,
        accountType: action.value,
      };
    case "CHANGE_FIELD7":
      return {
        ...state,
        aesKey: action.value,
      };
    case "CHANGE_FIELD8":
      return {
        ...state,
        iv: action.value,
      };
    case "CHANGE_FIELD9":
      return {
        ...state,
        userId: action.value,
      };
    case "SDK_RESPONSE":
      return {
        ...state,
        widgetResponseObject: action.value,
      };
    default:
      break;
  }

  return state;
};

export default reducer;
