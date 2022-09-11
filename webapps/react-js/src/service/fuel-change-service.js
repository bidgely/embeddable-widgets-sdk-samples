/* eslint-disable */

import { connect } from "react-redux";
import { InitialiseBidgelySdk } from "./bidgely-sdk-service";

function FuelChangeService(props) {
  InitialiseBidgelySdk(
    props.oauthClient,
    props.apiEndPoint,
    props.accessToken,
    props.aesKey,
    props.iv,
    props.userId,
    props.csrId,
    props.fuelType,
    props.accountType,
    false
  ).then((data) => {
    props.onChangeField("SDK_RESPONSE", data);
    if (data.messageType === "SUCCESS") {
      //need to handle success styling from timeout to loader
      history.push("/dashboard");
    }
  });
}

const mapStatetoProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onChangeField: (fieldName, fieldValue) =>
      dispatch({ type: fieldName, value: fieldValue }),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(FuelChangeService);
