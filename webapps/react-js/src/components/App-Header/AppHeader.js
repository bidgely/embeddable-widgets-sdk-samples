/* eslint-disable */
import "./AppHeader.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
import FuelChangeService from "../../service/fuel-change-service";
import { useDispatch } from "react-redux";
import { onChangeAuthField } from "../../state/reducers/AuthReducer";

function AppHeader(props) {
  const dispatch = useDispatch();
  const currentLocation = useLocation();

  const [activeFuel, changeActiveFuel] = useState(false);
  const homePath = currentLocation.pathname !== "/" || false;
  const [fuelChange, changeFuel] = useState(false);

  const handleFuelTypeChange = (event) => {
    //update the fuel in state using text from event currently
    dispatch(onChangeAuthField("fuelType", event.target.text));
    changeFuel(true);
  };

  useEffect(() => {
    changeFuel(false);
  });

  return (
    <div>
      <CHeader className="App-header">
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
          {homePath ? (
            <CCollapse className="header-collapse" visible={true}>
              <CHeaderNav>
                <CNavItem className="nav">
                  <Link to="/">Home</Link>
                </CNavItem>
                <CNavItem className="nav">
                  <Link to="/compare">Compare</Link>
                </CNavItem>
                <CDropdown variant="nav-item">
                  <CDropdownToggle color="secondary">Switch</CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem
                      onClick={handleFuelTypeChange}
                      active={activeFuel == "ELECTRIC"}
                    >
                      ELECTRIC
                    </CDropdownItem>
                    <CDropdownItem onClick={handleFuelTypeChange}>
                      GAS
                    </CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem onClick={handleFuelTypeChange}>
                      WATER
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CHeaderNav>
              {/* <CForm className="d-flex">
              <CFormInput className="me-2" type="search" placeholder="Search" />
              <CButton type="submit" color="success" variant="outline">
                Search
              </CButton>
            </CForm> */}
            </CCollapse>
          ) : (
            <></>
          )}
        </CContainer>
      </CHeader>
      {fuelChange ? <FuelChangeService /> : <></>}
    </div>
  );
}

export default AppHeader;
