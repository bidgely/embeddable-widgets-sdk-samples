/* eslint-disable */
import "./AppHeader.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  CHeader,
  CContainer,
  CHeaderBrand,
  CCollapse,
  CHeaderNav,
  CNavItem,
  CImage,
} from "@coreui/react";

function AppHeader() {
  const currentLocation = useLocation();

  const homePath = currentLocation.pathname !== "/" || false;
  const [visible, setVisible] = useState(true);

  return (
      <CHeader fixed className="App-header">
        <CContainer fluid>
          <CImage
            align="end"
            rounded
            src="/images/bidgely-logo.png"
            width={120}
            height={50}
          />
          <CHeaderBrand href="/" className="App-Title">
            Web Widget SDK Demo
          </CHeaderBrand>
          {homePath && (
            <CCollapse className="header-collapse" visible={visible}>
              <CHeaderNav>
                <CNavItem className="nav">
                  <Link to="/" onClick={() => window.location.href = "/"} active>Home</Link>
                </CNavItem>
                <CNavItem className="nav">
                  <Link to="/compare">Compare</Link>
                </CNavItem>
              </CHeaderNav>
            </CCollapse>
          )}
        </CContainer>
      </CHeader>
  );
}

export default AppHeader;
