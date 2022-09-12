/* eslint-disable */
import "./App.css";
import FormPage from "./components/formPage/FormPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import TabViewWidgets from "./components/tab-view-wdigets/TabViewWidgets";
import AppHeader from "./components/App-Header/AppHeader";
import AppFooter from "./components/App-Footer/AppFooter";
import CompareComponent from "./components/Compare/CompareComponent";
import RouteGuard from "./components/RouteGuard";
import { useSelector } from "react-redux";

function App() {
  const [visible, setVisible] = useState(true);
  const accessToken = useSelector(state => state.auth.accessToken)

  return (
    <div className="App">
      <Router>
        <AppHeader />
        <div className="appContent">
          <Switch>
            <Route path="/" exact component={FormPage}/>
            <RouteGuard path="/dashboard" auth={accessToken !== ""} component={TabViewWidgets}/>
            <RouteGuard path="/compare" auth={accessToken !== ""} component={CompareComponent}/>
          </Switch>
        </div>
        <AppFooter />
      </Router>
    </div>
  );
}

export default App;
