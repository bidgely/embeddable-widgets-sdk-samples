/* eslint-disable */
import { CFooter, CLink } from "@coreui/react";
import "../App-Footer/AppFooter.css";

function AppFooter() {
  return (
    <CFooter className="App-footer">
      <div>
        <span>&nbsp;Powered by </span>
        <CLink style={{ textDecoration: 'none' }} href="https://bidgely.com">Bidgely&copy;2024</CLink>
      </div>
    </CFooter>
  );
}

export default AppFooter;
