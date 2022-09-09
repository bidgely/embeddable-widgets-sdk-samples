/* eslint-disable */
import { CFooter, CLink } from "@coreui/react";
import "../App-Footer/AppFooter.css";

function AppFooter() {
  return (
    <CFooter className="App-footer">
      <div>
        <CLink href="https://bidgely.com">Widgets Demo</CLink>
        <span> 2022 Bidgely&copy;.</span>
      </div>
      <div>
        <span>Powered by </span>
        <CLink href="https://bidgely.com">Bidgely Widgets</CLink>
      </div>
    </CFooter>
  );
}

export default AppFooter;
