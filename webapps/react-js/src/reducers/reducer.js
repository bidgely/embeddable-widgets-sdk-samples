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
    case "oauthClient":
      return {
        ...state,
        oauthClient: action.value,
      };
    case "apiEndPoint":
      return {
        ...state,
        apiEndPoint: action.value,
      };
    case "accessToken":
      return {
        ...state,
        accessToken: action.value,
      };
    case "csrId":
      return {
        ...state,
        csrId: action.value,
      };
    case "fuelType":
      return {
        ...state,
        fuelType: action.value,
      };
    case "accountType":
      return {
        ...state,
        accountType: action.value,
      };
    case "aesKey":
      return {
        ...state,
        aesKey: action.value,
      };
    case "iv":
      return {
        ...state,
        iv: action.value,
      };
    case "userId":
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
