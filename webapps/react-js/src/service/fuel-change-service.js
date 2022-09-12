/* eslint-disable */

import { useDispatch } from "react-redux";
import { InitialiseBidgelySdk } from "./bidgely-sdk-service";
import { useSelector } from "react-redux";
import {
  onChangeAuthField,
  setSdkInitInfo,
} from "../state/reducers/AuthReducer";
import { setSdkInstance } from "../state/reducers/BidgelySdkReducer";

function FuelChangeService() {
  const dispatch = useDispatch();
  const props = useSelector((state) => state.auth);
  console.log(props);
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
    dispatch(onChangeAuthField("SDK_RESPONSE", data));
    if (data.messageType === "SUCCESS") {
      dispatch(
        setSdkInstance(
          data.data.instanceId,
          props.userId,
          props.fuelType,
          props.accountType
        )
      );
      dispatch(
        setSdkInitInfo(
          props.oauthClient,
          props.apiEndPoint,
          props.accessToken,
          props.aesKey,
          props.iv,
          props.userId,
          props.csrId,
          props.fuelType,
          props.accountType
        )
      );
      //history.push("/dashboard");
    }
  });
}

export default FuelChangeService;
