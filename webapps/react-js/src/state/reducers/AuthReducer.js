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

export function setSdkInitInfo({oauthClient, apiEndPoint, accessToken, csrId, 
                               fuelType, accountType, aesKey, iv, userId}) {

  return dispatch => {
    dispatch({ type: "SET_SDK_INIT_INFO", payload : {
        oauthClient, apiEndPoint, accessToken, csrId, 
        fuelType, accountType, aesKey, iv, userId
      } 
    })
  }
}

export function onChangeAuthField(fieldName, fieldValue) {
  return dispatch => {
    dispatch({ type: fieldName, value: fieldValue })
  }
}

export const AuthReducer = (state = intialState, action) => {
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

    case "SET_SDK_INIT_INFO":
      const payload = action.payload
      return {
        ...state,
        oauthClient : payload.oauthClient,
        apiEndPoint : payload.apiEndPoint,
        accessToken : payload.accessToken,
        csrId       : payload.csrId,
        fuelType    : payload.fuelType,
        accountType : payload.accountType,
        aesKey      : payload.aesKey,
        iv          : payload.iv,
        userId      : payload.userId,
      }
    default:
      break;
  }

  return state;
};