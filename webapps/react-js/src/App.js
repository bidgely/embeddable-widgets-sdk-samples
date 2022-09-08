/* eslint-disable */
import "./App.css";
import FormPage from "./formPage/FormPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import InitialiseSdk from "./InitialiseSdk/InitialiseSdk";

function App() {
  return (
    <div>
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
