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
import { useDispatch } from "react-redux";
import "./Formpage.css";
import axios from "axios";

import { InitialiseBidgelySdk } from "../../service/BidgelySdkService";
import { setFormDataToLocalStorage } from "../../utils/LocalStorageUtils";
import { onChangeAuthField, setSdkInitInfo } from "../../state/reducers/AuthReducer";
import { setSdkInstance } from "../../state/reducers/BidgelySdkReducer";

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

  const dispatch = useDispatch()

  let localStorageInfo = {}

  const [validated, setValidated] = useState(false);

  const [oauthClient, setOauthClient] = useState("");
  const [apiEndPoint, setApiEndPoint] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [aesKey, setAesKey] = useState("");
  const [iv, setIv] = useState("");
  const [userId, setUserId] = useState("");
  const [csrId, setCsrId] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [accountType, setAccountType] = useState("");

  useEffect(() => {
    //getting localStorage to autofill last successfull sdk initialisation
    localStorageInfo = JSON.parse(
      localStorage.getItem("bidgelySdkInitInfo") || "{}"
    );
  
    setOauthClient(localStorageInfo.oauthClient)
    setApiEndPoint(localStorageInfo.apiEndPoint)
    setAccessToken(localStorageInfo.accessToken)
    setAesKey(localStorageInfo.aesKey)
    setIv(localStorageInfo.iv)
    setUserId(localStorageInfo.userId)
    setCsrId(localStorageInfo.csrId)
    setFuelType(localStorageInfo.fuelType)
    setAccountType(localStorageInfo.accountType)

  }, [])
  
  const history = useHistory();
  const [responseMessage, setResponseMessgae] = useState();

  const onChangeField = (fieldName, fieldValue) => {
    dispatch(onChangeAuthField(fieldName, fieldValue))
  }

  const navigateToCompare = (event) => {
    
    history.push("/compare")
  }

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
        onChangeField("SDK_RESPONSE", data);
        if (data.messageType === "SUCCESS") {      
          setResponseMessgae(data.messageType);
          dispatch(setSdkInstance(data.data.instanceId, userId, fuelType, accountType))
          dispatch(setSdkInitInfo(oauthClient,
            apiEndPoint,
            accessToken,
            aesKey,
            iv,
            userId,
            csrId,
            fuelType,
            accountType))

          setFormDataToLocalStorage({
            oauthClient, apiEndPoint, accessToken, aesKey, iv, 
            userId, csrId, fuelType, accountType
          });
          //need to handle success styling from timeout to loader
          history.push("/dashboard");
        } else {
          setResponseMessgae(data?.data?.errorMessage);
          console.log(responseMessage);
        }
      });
    }
    setValidated(true);
  };

  const handleOauthChange = (event) => {
    setOauthClient(event.target.value);
    onChangeField("CHANGE_FIELD1", event.target.value);
  };

  if (responseMessage) {
    //TODO user Would be able to easily whitelist helpful to developers while trying widgets
    //callWhiteList(apiEndPoint, oauthClient, accessToken);
  }

  useEffect(() => {
    onChangeField("CHANGE_FIELD1", oauthClient);
    onChangeField("CHANGE_FIELD2", apiEndPoint);
    onChangeField("CHANGE_FIELD3", accessToken);
    onChangeField("CHANGE_FIELD4", csrId);
    onChangeField("CHANGE_FIELD5", fuelType);
    onChangeField("CHANGE_FIELD6", accountType);
    onChangeField("CHANGE_FIELD7", aesKey);
    onChangeField("CHANGE_FIELD8", iv);
    onChangeField("CHANGE_FIELD9", userId);
  });

  return (
    <div className="sdk-input">

      <CForm
        className="sdk-input-form g-3 needs-validation"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
      <div className="sdk-input-header">My Dashboard</div>

        <CRow className="mb-3">
          <CFormLabel htmlFor="oauthClient" className="col-sm-2 col-form-label">
            Oauth Client Id *:
          </CFormLabel>
          <CCol sm={5}>
            <CFormInput
              type="text"
              defaultValue={oauthClient}
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
              id={apiEndPoint}
              onChange={(e) => {
                setApiEndPoint(e.target.value);
                onChangeField("CHANGE_FIELD2", e.target.value);
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
              id={accessToken}
              onChange={(e) => {
                setAccessToken(e.target.value);
                onChangeField("CHANGE_FIELD3", e.target.value);
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
              id={aesKey}
              onChange={(e) => {
                setAesKey(e.target.value);
                onChangeField("CHANGE_FIELD7", e.target.value);
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
              id={iv}
              onChange={(e) => {
                setIv(e.target.value);
                onChangeField("CHANGE_FIELD8", e.target.value);
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
              id={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                onChangeField("CHANGE_FIELD9", e.target.value);
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
              id={csrId}
              onChange={(e) => {
                setCsrId(e.target.value);
                onChangeField("CHANGE_FIELD4", e.target.value);
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
                onChangeField("CHANGE_FIELD5", fuelType);
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
                onChangeField("CHANGE_FIELD6", e.target.value);
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
            Take me to my Dashboard
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

    <div className="sdk-compare">
      <div className="sdk-input-header">Compare Users</div>
      <div className="sdk-compare-content">
        <div className="sdk-compare-text">Compare 2 users (same or different) to get deep insights on energy usage</div>
        <div>
        <CButton color="primary" onClick={navigateToCompare}>
          Compare
        </CButton>
        </div>
        
      </div>
    </div>

    </div>
  );
}

export default FormPage;
