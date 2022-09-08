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

function FormPage() {
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

  //onChange={e => setFirstName(e.target.value)}
  const handleSubmit = (event) => {
    console.log("submit", event);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setInitWidget(true);
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    setInitWidget(true);
  };

  const handleOauthChange = (event) => {
    setOauthClient(event.target.value);
    setInitWidget(false);
  };

  return (
    <div>
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

        <CCol md={4}>
          <CFormInput
            type="text"
            defaultValue={apiEndPoint}
            feedbackValid="Looks good!"
            id={apiEndPoint}
            label="Api End Point"
            onChange={(e) => {
              setApiEndPoint(e.target.value);
              setInitWidget(false);
            }}
            required
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            defaultValue={accessToken}
            feedbackValid="Looks good!"
            id={accessToken}
            label="Access Token"
            onChange={(e) => {
              setInitWidget(false);
              setAccessToken(e.target.value);
            }}
            required
          />
        </CCol>

        <CCol md={4}>
          <CFormInput
            type="text"
            defaultValue={aesKey}
            feedbackValid="Looks good!"
            id={aesKey}
            label="Aes Key"
            onChange={(e) => {
              setInitWidget(false);
              setAesKey(e.target.value);
            }}
            required
          />
        </CCol>

        <CCol md={4}>
          <CFormInput
            type="text"
            defaultValue={iv}
            feedbackValid="Looks good!"
            id={iv}
            label="IV"
            onChange={(e) => {
              setInitWidget(false);
              setIv(e.target.value);
            }}
            required
          />
        </CCol>

        <CCol md={4}>
          <CFormInput
            type="text"
            defaultValue={userId}
            feedbackValid="Looks good!"
            id={userId}
            label="Partner User Id"
            onChange={(e) => {
              setInitWidget(false);
              setUserId(e.target.value);
            }}
            required
          />
        </CCol>

        <CCol md={4}>
          <CFormInput
            type="text"
            defaultValue={csrId}
            feedbackValid="Looks good!"
            id={csrId}
            label="CSR Id"
            onChange={(e) => {
              setInitWidget(false);
              setCsrId(e.target.value);
            }}
            required
          />
        </CCol>

        <CCol md={3}>
          <CFormSelect
            aria-describedby="validationCustom04Feedback"
            feedbackInvalid="Please select a valid fuel type."
            id="validationCustom04"
            label="Fuel Type"
            value={fuelType}
            onChange={(e) => {
              setInitWidget(false);
              setFuelType(e.target.value);
            }}
            required
          >
            <option></option>
            <option value="ELECTRIC">ELECTRIC</option>
            <option value="GAS">GAS</option>
            <option value="WATER">WATER</option>
          </CFormSelect>
        </CCol>

        <CCol md={3}>
          <CFormSelect
            aria-describedby="validationCustom04Feedback"
            feedbackInvalid="Please select a valid fuel type."
            id="validationCustom04"
            label="Account Type"
            value={accountType}
            onChange={(e) => {
              setInitWidget(false);
              setAccountType(e.target.value);
            }}
            required
          >
            <option></option>
            <option>RESIDENTIAL</option>
            <option>SMB</option>
            {/* <option></option> */}
          </CFormSelect>
        </CCol>
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

export default FormPage;
