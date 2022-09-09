/* eslint-disable */

import { connect } from "react-redux";
import TabViewWidgets from "../tab-view-wdigets/TabViewWidgets";
import FormPage from "../formPage/FormPage";
import { useHistory } from "react-router-dom";

function InitialiseSdk(props) {
  console.log(props)
  const history = useHistory();

  const client_id = props.oauthClient;
  const api_url = props.apiEndPoint;
  const accessToken = props.accessToken;
  const aesKey = props.aesKey;
  const ivStr = props.iv;
  const utilityAccountIdentifier = props.userId;
  const csr_id = props.csrId;
  const fuelType = props.fuelType;
  const accountType = props.accountType;

  const renderWidgetsImmediate = true;

  const payload = {
    utilityAccountIdentifier,
    fuelType,
    accountType,
    accessToken,
  };
  try {
    const ivArr = [];
    for (let i in ivStr) {
      ivArr.push(ivStr.charCodeAt(i));
    }

    const iv = new Uint8Array(ivArr),
      privKey = btoa(aesKey);

    const SYM_ALGO = { name: "AES-CBC", length: 256, iv: iv },
      privUint8 = Uint8Array.from(atob(privKey), (c) => c.charCodeAt(0)),
      encStr = new window.TextEncoder("utf-8").encode(JSON.stringify(payload));

    const palette = {
      // primary : {
      //   200 : '#FFEDED',
      //   300 : '#FB8888',
      //   400 : '#F71818',
      //   500 : '#EC0202',
      //   600 : '#BB0606',
      // },
      // primary : {
      //   200 : '#D7FCE4',
      //   300 : '#71F19F',
      //   400 : '#23DC65',
      //   500 : '#14843C',
      //   600 : '#0D5627',
      // }
    };

    crypto.subtle
      .importKey("raw", privUint8, SYM_ALGO, false, ["encrypt", "decrypt"])
      .then((key) => {
        window.crypto.subtle
          .encrypt(SYM_ALGO, key, encStr)
          .then((encPayload) => {
            const encB64 = btoa(
              String.fromCharCode(...new Uint8Array(encPayload))
            );
            const initParams = {
              client_id,
              csr_id,
              api_url,
              payload: encB64,
              palette,
              renderWidgetsImmediate,
            };

            BidgelyWebSdk.initialize(
              BidgelyWebSdk.RUN_MODE.PERF,
              initParams,
              (data) => {
                console.log("BidgelyWebSdk initialize: ", data);

                if (data.messageType === "SUCCESS") {
                  //   instanceId = data.instanceId

                  const localStorageInfo = JSON.parse(
                    localStorage.getItem("bidgelySdkInitInfo") || "{}"
                  );
                  localStorageInfo.clientId = client_id;
                  localStorageInfo.apiUrl = api_url;
                  localStorageInfo.aesKey = aesKey;
                  localStorageInfo.iv = ivStr;
                  localStorageInfo.accessToken = accessToken;
                  localStorageInfo.userId = utilityAccountIdentifier;
                  localStorageInfo.csrId = csr_id;
                  localStorageInfo.accountType = accountType;
                  localStorageInfo.fuelType = fuelType;
                  localStorage.setItem(
                    "bidgelySdkInitInfo",
                    JSON.stringify(localStorageInfo)
                  );

                  //            if (!renderWidgetsImmediate) showRenderContainer()
                }

                if (data.messageType === "ERROR") {
                  props.onChangeField("ERROR_API", data);
                  history.push("/");
                  return (
                    <div>
                      <FormPage initializationError={data} />
                    </div>
                  );
                }
              }
            );
          });
      });
  } catch (e) {}

  return (
    <div>
      <TabViewWidgets />
    </div>
  );
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
export default connect(mapStatetoProps, mapDispatchtoProps)(InitialiseSdk);
