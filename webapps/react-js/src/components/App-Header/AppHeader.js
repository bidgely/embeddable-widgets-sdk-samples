/* eslint-disable */
import "./AppHeader.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import {
  CHeader,
  CContainer,
  CHeaderBrand,
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

function AppHeader() {
  const currentLocation = useLocation();

  const homePath = currentLocation.pathname !== "/" || false;
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <CHeader>
        <CContainer fluid>
          <CImage
            align="end"
            rounded
            src="/images/bidgely-logo.png"
            width={100}
            height={50}
          />
          <CHeaderBrand href="/" className="App-Title">
            Web Widget SDK Demo
          </CHeaderBrand>
          {homePath && (
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
          )}
        </CContainer>
      </CHeader>
    </div>
  );
}

export default AppHeader;
