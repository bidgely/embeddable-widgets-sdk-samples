/* eslint-disable */
import "./App.css";
import FormPage from "./components/formPage/FormPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import InitialiseSdk from "./components/InitialiseSdk/InitialiseSdk";
import { useState } from "react";
import {
  CHeader,
  CContainer,
  CHeaderBrand,
  CHeaderToggler,
  CCollapse,
  CHeaderNav,
  CNavItem,
  CNavLink,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CImage,
} from "@coreui/react";
function App() {
  const [visible, setVisible] = useState(true);
  return (
    <div>
      <CHeader>
        <CContainer fluid>
          <CImage
            align="end"
            rounded
            src="https://www.google.com/u/0/ac/images/logo.gif?uid=113977568761990794316"
            width={100}
            height={50}
          />
          <CHeaderBrand href="/" className="bold-weight">
            Web Widget SDK Demo
          </CHeaderBrand>
          <CHeaderToggler onClick={() => setVisible(!visible)} />
          <CCollapse className="header-collapse" visible={visible}>
            <CHeaderNav>
              <CNavItem>
                <CNavLink href="/" active>
                  Home
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/">Form</CNavLink>
              </CNavItem>
              <CDropdown variant="nav-item">
                <CDropdownToggle color="secondary">Switch</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="/Dashboard">ELECTRIC</CDropdownItem>
                  <CDropdownItem href="/">GAS</CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem href="/">
                    Something else here other home?
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              {/* <CNavItem>
                <CNavLink href="/" disabled>
                  Disabled
                </CNavLink>
              </CNavItem> */}
            </CHeaderNav>
            {/* <CForm className="d-flex">
              <CFormInput className="me-2" type="search" placeholder="Search" />
              <CButton type="submit" color="success" variant="outline">
                Search
              </CButton>
            </CForm> */}
          </CCollapse>
        </CContainer>
      </CHeader>
      <Router>
        <Switch>
          <Route path="/" exact>
            <FormPage />
          </Route>
          <Route path="/dashboard">
            <InitialiseSdk />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

// {/* <div className="App">
// <header className="App-header">
//   {/* <img src={logo} className="App-logo" alt="logo" /> */}
// <p>
//   Edit <code>src/App.js</code> and save to reload.
// </p>
// <a
//   className="App-link"
//   href="https://reactjs.org"
//   target="_blank"
//   rel="noopener noreferrer"
// >
//   Learn React
// </a>
// </header>
// </div> */}
