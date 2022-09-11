/* eslint-disable */
import { useState, useEffect } from "react";
import {
  CForm,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CButton,
  CRow,
  CAlert,
} from "@coreui/react";

import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "./Formpage.css";
import axios from "axios";

import { InitialiseBidgelySdk } from "../../service/bidgely-sdk-service";
import { setFormDataToLocalStorage } from "../../helpers/helpers";

function callWhiteList(apiEndPoint, oauthClientId, accessToken) {
  //to Do Convert this to a input / api solution
  var ipAddressUrl = apiEndPoint + "/v2.0/whitelist-origin/";
  const AuthStr = "Bearer " + accessToken;
  const payload = {
    clientId: oauthClientId,
    requestOrigin: "2406:7400:51:e033:b49c:b354:58bb:d09e",
  };
  axios
    .post(ipAddressUrl, payload, { headers: { Authorization: AuthStr } })
    .then((response) => {
      console.log("whitelisting is done", response);
    })
    .catch((error) => {
      console.log(error);
    });
}

function FormPage(props) {
  //getting localStorage to autofill last successfull sdk initialisation
  const localStorageInfo = JSON.parse(
    localStorage.getItem("bidgelySdkInitInfo") || "{}"
  );

  const [validated, setValidated] = useState(false);
  const [oauthClient, setOauthClient] = localStorageInfo.oauthClient
    ? useState(localStorageInfo.oauthClient)
    : useState("");

  const [apiEndPoint, setApiEndPoint] = localStorageInfo.apiEndPoint
    ? useState(localStorageInfo.apiEndPoint)
    : useState("");

  const [accessToken, setAccessToken] = localStorageInfo.accessToken
    ? useState(localStorageInfo.accessToken)
    : useState("");

  const [aesKey, setAesKey] = localStorageInfo.aesKey
    ? useState(localStorageInfo.aesKey)
    : useState("");
  const [iv, setIv] = localStorageInfo.iv
    ? useState(localStorageInfo.iv)
    : useState("");

  const [userId, setUserId] = localStorageInfo.userId
    ? useState(localStorageInfo.userId)
    : useState("");

  const [csrId, setCsrId] = localStorageInfo.csrId
    ? useState(localStorageInfo.csrId)
    : useState("");
  const [fuelType, setFuelType] = localStorageInfo.fuelType
    ? useState(localStorageInfo.fuelType)
    : useState("");
  const [accountType, setAccountType] = localStorageInfo.accountType
    ? useState(localStorageInfo.accountType)
    : useState("");

  const history = useHistory();
  const [responseMessage, setResponseMessgae] = useState();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      InitialiseBidgelySdk(
        oauthClient,
        apiEndPoint,
        accessToken,
        aesKey,
        iv,
        userId,
        csrId,
        fuelType,
        accountType,
        true
      ).then((data) => {
        props.onChangeField("SDK_RESPONSE", data);
        if (data.messageType === "SUCCESS") {
          setResponseMessgae(data.messageType);
          setFormDataToLocalStorage(props);
          //need to handle success styling from timeout to loader
          history.push("/dashboard");
        } else {
          setResponseMessgae(data?.data?.errorMessage);
        }
      });
    }
    setValidated(true);
  };

  const handleOauthChange = (event) => {
    setOauthClient(event.target.value);
    props.onChangeField("oauthClient", event.target.value);
  };

  if (responseMessage) {
    //TODO user Would be able to easily whitelist helpful to developers while trying widgets
    //callWhiteList(apiEndPoint, oauthClient, accessToken);
  }

  useEffect(() => {
    props.onChangeField("oauthClient", oauthClient);
    props.onChangeField("apiEndPoint", apiEndPoint);
    props.onChangeField("accessToken", accessToken);
    props.onChangeField("csrId", csrId);
    props.onChangeField("fuelType", fuelType);
    props.onChangeField("accountType", accountType);
    props.onChangeField("aesKey", aesKey);
    props.onChangeField("iv", iv);
    props.onChangeField("userId", userId);
  });

  return (
    <div className="sdk-input">
      <CForm
        className="sdk-input-form g-3 needs-validation"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <CRow className="mb-3">
          <CFormLabel htmlFor="oauthClient" className="col-sm-2 col-form-label">
            Oauth Client Id *:
          </CFormLabel>
          <CCol sm={5}>
            <CFormInput
              type="text"
              defaultValue={oauthClient}
              feedbackValid="Looks good!"
              id="oauthClient"
              onChange={handleOauthChange}
              required
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CFormLabel htmlFor="oauthClient" className="col-sm-2 col-form-label">
            Api End Point *:
          </CFormLabel>
          <CCol sm={5}>
            <CFormInput
              type="text"
              defaultValue={apiEndPoint}
              feedbackValid="Looks good!"
              id={apiEndPoint}
              onChange={(e) => {
                setApiEndPoint(e.target.value);
                props.onChangeField("apiEndPoint", e.target.value);
              }}
              required
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CFormLabel htmlFor="oauthClient" className="col-sm-2 col-form-label">
            Access Token *:
          </CFormLabel>
          <CCol sm={5}>
            <CFormInput
              type="text"
              defaultValue={accessToken}
              feedbackValid="Looks good!"
              id={accessToken}
              onChange={(e) => {
                setAccessToken(e.target.value);
                props.onChangeField("accessToken", e.target.value);
              }}
              required
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CFormLabel htmlFor="oauthClient" className="col-sm-2 col-form-label">
            Aes Key *:
          </CFormLabel>
          <CCol sm={5}>
            <CFormInput
              type="text"
              defaultValue={aesKey}
              feedbackValid="Looks good!"
              id={aesKey}
              onChange={(e) => {
                setAesKey(e.target.value);
                props.onChangeField("aesKey", e.target.value);
              }}
              required
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CFormLabel htmlFor="oauthClient" className="col-sm-2 col-form-label">
            IV *:
          </CFormLabel>
          <CCol sm={5}>
            <CFormInput
              type="text"
              defaultValue={iv}
              feedbackValid="Looks good!"
              id={iv}
              onChange={(e) => {
                setIv(e.target.value);
                props.onChangeField("iv", e.target.value);
              }}
              required
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CFormLabel htmlFor="oauthClient" className="col-sm-2 col-form-label">
            Partner User Id *:
          </CFormLabel>
          <CCol sm={5}>
            <CFormInput
              type="text"
              defaultValue={userId}
              feedbackValid="Looks good!"
              id={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                props.onChangeField("userId", e.target.value);
              }}
              required
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CFormLabel htmlFor="oauthClient" className="col-sm-2 col-form-label">
            CSR Id :
          </CFormLabel>
          <CCol sm={5}>
            <CFormInput
              type="text"
              defaultValue={csrId}
              feedbackValid="Looks good!"
              id={csrId}
              onChange={(e) => {
                setCsrId(e.target.value);
                props.onChangeField("csrId", e.target.value);
              }}
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CFormLabel htmlFor="fuelType" className="col-sm-2 col-form-label">
            Fuel Type *:
          </CFormLabel>
          <CCol sm={5}>
            <CFormSelect
              aria-describedby="validationCustom04Feedback"
              feedbackInvalid="Please select a valid fuel type."
              id="validationCustom05"
              value={fuelType}
              onChange={(e) => {
                setFuelType(e.target.value);
                props.onChangeField("fuelType", fuelType);
              }}
              required
            >
              <option></option>
              <option value="ELECTRIC">ELECTRIC</option>
              <option value="GAS">GAS</option>
              <option value="WATER">WATER</option>
            </CFormSelect>
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CFormLabel htmlFor="oauthClient" className="col-sm-2 col-form-label">
            Account Type *:
          </CFormLabel>
          <CCol sm={5}>
            <CFormSelect
              aria-describedby="validationCustom04Feedback"
              feedbackInvalid="Please select a valid fuel type."
              id="validationCustom04"
              value={accountType}
              onChange={(e) => {
                setAccountType(e.target.value);
                props.onChangeField("accountType", e.target.value);
              }}
              required
            >
              <option></option>
              <option>RESIDENTIAL</option>
              <option>SMB</option>
              {/* <option></option> */}
            </CFormSelect>
          </CCol>
        </CRow>
        <br />

        <CCol xs={12}>
          <CButton color="primary" type="submit">
            Submit
          </CButton>
        </CCol>
      </CForm>

      {responseMessage?.length > 0 ? (
        <CCol md={10} className="sdk-input-form-error">
          <CAlert color="danger" className="d-flex align-items-center">
            <svg
              className="flex-shrink-0 me-2"
              width="24"
              height="24"
              viewBox="0 0 512 512"
            >
              <rect
                width="32"
                height="176"
                x="240"
                y="176"
                fill="var(--ci-primary-color, currentColor)"
                className="ci-primary"
              ></rect>
              <rect
                width="32"
                height="32"
                x="240"
                y="384"
                fill="var(--ci-primary-color, currentColor)"
                className="ci-primary"
              ></rect>
              <path
                fill="var(--ci-primary-color, currentColor)"
                d="M274.014,16H237.986L16,445.174V496H496V445.174ZM464,464H48V452.959L256,50.826,464,452.959Z"
                className="ci-primary"
              ></path>
            </svg>
            <div>{responseMessage}</div>
          </CAlert>
          <CAlert color="info" className="d-flex align-items-center">
            <div>
              (Note : Soon a button to whitelist from here Will be added)
            </div>
          </CAlert>
        </CCol>
      ) : (
        <></>
      )}
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

export default connect(mapStatetoProps, mapDispatchtoProps)(FormPage);
