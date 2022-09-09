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
import InitialiseSdk from "../InitialiseSdk/InitialiseSdk";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../formPage/Formpage.css";
import axios from "axios";

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
  const errorMessage = props?.errorObject?.data?.errorMessage;

  const localStorageInfo = JSON.parse(
    localStorage.getItem("bidgelySdkInitInfo") || "{}"
  );
  const [initialiseWidget, setInitWidget] = useState(false);
  const [validated, setValidated] = useState(false);
  const [oauthClient, setOauthClient] = localStorageInfo.clientId
    ? useState(localStorageInfo.clientId)
    : useState("");

  const [apiEndPoint, setApiEndPoint] = localStorageInfo.apiUrl
    ? useState(localStorageInfo.apiUrl)
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

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setInitWidget(true);
      event.preventDefault();
      event.stopPropagation();
      history.push("/dashboard");
    }
    setValidated(true);
    //setInitWidget(true);
  };

  const handleOauthChange = (event) => {
    setOauthClient(event.target.value);
    props.onChangeField("CHANGE_FIELD1", event.target.value);
    setInitWidget(false);
  };

  if (errorMessage) {
    //TODO user Would be able to easily whitelist helpful to developers while trying widgets
    //callWhiteList(apiEndPoint, oauthClient, accessToken);
  }

  useEffect(() => {
    props.onChangeField("CHANGE_FIELD1", oauthClient);
    props.onChangeField("CHANGE_FIELD2", apiEndPoint);
    props.onChangeField("CHANGE_FIELD3", accessToken);
    props.onChangeField("CHANGE_FIELD4", csrId);
    props.onChangeField("CHANGE_FIELD5", fuelType);
    props.onChangeField("CHANGE_FIELD6", accountType);
    props.onChangeField("CHANGE_FIELD7", aesKey);
    props.onChangeField("CHANGE_FIELD8", iv);
    props.onChangeField("CHANGE_FIELD9", userId);
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
              //label="Oauth client"
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
              //label="Api End Point"
              onChange={(e) => {
                setApiEndPoint(e.target.value);
                props.onChangeField("CHANGE_FIELD2", e.target.value);
                setInitWidget(false);
              }}
              required
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CFormLabel htmlFor="oauthClient" className="col-sm-2 col-form-label">
            Access Token *:
          </CFormLabel>
          <CCol md={4}>
            <CFormInput
              type="text"
              defaultValue={accessToken}
              feedbackValid="Looks good!"
              id={accessToken}
              //label="Access Token"
              onChange={(e) => {
                setInitWidget(false);
                setAccessToken(e.target.value);
                props.onChangeField("CHANGE_FIELD3", e.target.value);
              }}
              required
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CFormLabel htmlFor="oauthClient" className="col-sm-2 col-form-label">
            Aes Key *:
          </CFormLabel>
          <CCol md={4}>
            <CFormInput
              type="text"
              defaultValue={aesKey}
              feedbackValid="Looks good!"
              id={aesKey}
              //label="Aes Key"
              onChange={(e) => {
                setInitWidget(false);
                setAesKey(e.target.value);
                props.onChangeField("CHANGE_FIELD7", e.target.value);
              }}
              required
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CFormLabel htmlFor="oauthClient" className="col-sm-2 col-form-label">
            IV *:
          </CFormLabel>
          <CCol md={4}>
            <CFormInput
              type="text"
              defaultValue={iv}
              feedbackValid="Looks good!"
              id={iv}
              //label="IV"
              onChange={(e) => {
                setInitWidget(false);
                setIv(e.target.value);
                props.onChangeField("CHANGE_FIELD8", e.target.value);
              }}
              required
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CFormLabel htmlFor="oauthClient" className="col-sm-2 col-form-label">
            Partner User Id *:
          </CFormLabel>
          <CCol md={4}>
            <CFormInput
              type="text"
              defaultValue={userId}
              feedbackValid="Looks good!"
              id={userId}
              //label="Partner User Id"
              onChange={(e) => {
                setInitWidget(false);
                setUserId(e.target.value);
                props.onChangeField("CHANGE_FIELD9", e.target.value);
              }}
              required
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CFormLabel htmlFor="oauthClient" className="col-sm-2 col-form-label">
            CSR Id :
          </CFormLabel>
          <CCol md={4}>
            <CFormInput
              type="text"
              defaultValue={csrId}
              feedbackValid="Looks good!"
              id={csrId}
              //label="CSR Id"
              onChange={(e) => {
                setInitWidget(false);
                setCsrId(e.target.value);
                props.onChangeField("CHANGE_FIELD4", e.target.value);
              }}
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CFormLabel htmlFor="fuelType" className="col-sm-2 col-form-label">
            Fuel Type *:
          </CFormLabel>
          <CCol md={3}>
            <CFormSelect
              aria-describedby="validationCustom04Feedback"
              feedbackInvalid="Please select a valid fuel type."
              id="validationCustom05"
              //label="Fuel Type"
              value={fuelType}
              onChange={(e) => {
                setInitWidget(false);
                setFuelType(e.target.value);
                props.onChangeField("CHANGE_FIELD5", fuelType);
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
          <CCol md={3}>
            <CFormSelect
              aria-describedby="validationCustom04Feedback"
              feedbackInvalid="Please select a valid fuel type."
              id="validationCustom04"
              //label="Account Type"
              value={accountType}
              onChange={(e) => {
                setInitWidget(false);
                setAccountType(e.target.value);
                props.onChangeField("CHANGE_FIELD6", e.target.value);
                console.log(props);
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
            Submit form
          </CButton>
        </CCol>
      </CForm>

      {errorMessage?.length > 0 ? (
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
            <div>{errorMessage}</div>
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

      {/* {initialiseWidget && (
        <InitialiseSdk
          oauthClient={oauthClient}
          apiEndPoint={apiEndPoint}
          accessToken={accessToken}
          aesKey={aesKey}
          iv={iv}
          userId={userId}
          csrId={csrId}
          fuelType={fuelType}
          accountType={accountType}
        ></InitialiseSdk>
      )} */}
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
