/* eslint-disable */
import { useState } from "react";
import {
  CForm,
  CFormCheck,
  CCol,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CFormFeedback,
  CButton,
  CRow,
} from "@coreui/react";
import InitialiseSdk from "../InitialiseSdk/InitialiseSdk";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import '../formPage/Formpage.css';

function FormPage(props) {
  console.log({ props });
  const localStorageInfo = JSON.parse(
    localStorage.getItem("bidgelySdkInitInfo") || "{}"
  );
  const [initialiseWidget, setInitWidget] = useState(false);
  const [validated, setValidated] = useState(false);
  const [oauthClient, setOauthClient] = localStorageInfo.clientId
    ? useState(localStorageInfo.clientId)
    : useState("");
  props.onChangeField("CHANGE_FIELD1", localStorageInfo.clientId);
  const [apiEndPoint, setApiEndPoint] = localStorageInfo.apiUrl
    ? useState(localStorageInfo.apiUrl)
    : useState("");
  props.onChangeField("CHANGE_FIELD2", localStorageInfo.apiUrl);
  const [accessToken, setAccessToken] = localStorageInfo.accessToken
    ? useState(localStorageInfo.accessToken)
    : useState("");
  props.onChangeField("CHANGE_FIELD3", localStorageInfo.accessToken);
  const [aesKey, setAesKey] = localStorageInfo.aesKey
    ? useState(localStorageInfo.aesKey)
    : useState("");
  props.onChangeField("CHANGE_FIELD7", localStorageInfo.aesKey);
  const [iv, setIv] = localStorageInfo.iv
    ? useState(localStorageInfo.iv)
    : useState("");
  props.onChangeField("CHANGE_FIELD8", localStorageInfo.iv);
  const [userId, setUserId] = localStorageInfo.userId
    ? useState(localStorageInfo.userId)
    : useState("");
  props.onChangeField("CHANGE_FIELD9", localStorageInfo.userId);
  const [csrId, setCsrId] = localStorageInfo.csrId
    ? useState(localStorageInfo.csrId)
    : useState("");
  props.onChangeField("CHANGE_FIELD4", localStorageInfo.csrId);
  const [fuelType, setFuelType] = localStorageInfo.fuelType
    ? useState(localStorageInfo.fuelType)
    : useState("");
  props.onChangeField("CHANGE_FIELD5", localStorageInfo.fuelType);
  const [accountType, setAccountType] = localStorageInfo.accountType
    ? useState(localStorageInfo.accountType)
    : useState("");
  props.onChangeField("CHANGE_FIELD6", localStorageInfo.accountType);
  const history = useHistory();

  const handleSubmit = (event) => {
    console.log("submit", event);
    history.push("/dashboard");
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

  return (
    <div className="sdk-input-form">
      <CForm
        className="g-3 needs-validation"
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
            CSR Id *:
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
              required
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CFormLabel htmlFor="oauthClient" className="col-sm-2 col-form-label">
            Fuel Type *:
          </CFormLabel>
          <CCol md={3}>
            <CFormSelect
              aria-describedby="validationCustom04Feedback"
              feedbackInvalid="Please select a valid fuel type."
              id="validationCustom04"
              //label="Fuel Type"
              value={fuelType}
              onChange={(e) => {
                setInitWidget(false);
                setFuelType(e.target.value);
                props.onChangeField("CHANGE_FIELD5", e.target.value);
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
      {initialiseWidget && (
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
