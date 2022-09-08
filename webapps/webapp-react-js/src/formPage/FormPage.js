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
  const [initialiseWidget, setInitWidget] = useState(false);
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

  //onChange={e => setFirstName(e.target.value)}
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setInitWidget(true);
    }
    setValidated(true);
    setInitWidget(true)
  };

  const handleOauthChange = (event) => {
    setOauthClient(event.target.value);
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
            onChange={(e) => setApiEndPoint(e.target.value)}
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
            onChange={(e) => setAccessToken(e.target.value)}
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
            onChange={(e) => setAesKey(e.target.value)}
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
            onChange={(e) => setIv(e.target.value)}
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
            onChange={(e) => setUserId(e.target.value)}
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
            onChange={(e) => setCsrId(e.target.value)}
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
            onChange={(e) => setFuelType(e.target.value)}
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
            onChange={(e) => setAccountType(e.target.value)}
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

