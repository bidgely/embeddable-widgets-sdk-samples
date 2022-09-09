/* eslint-disable */
import "./App.css";
import FormPage from "./components/formPage/FormPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import TabViewWidgets from "./components/tab-view-wdigets/TabViewWidgets";
import AppHeader from "./components/App-Header/AppHeader";
import AppFooter from "./components/App-Footer/AppFooter";

function App() {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/" exact>
            <FormPage />
          </Route>
          <Route path="/dashboard">
            <TabViewWidgets />
          </Route>
        </Switch>
        <AppFooter />
      </Router>
    </div>
  );
}

export default App;
