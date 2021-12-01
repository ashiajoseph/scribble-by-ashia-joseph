import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { initializeLogger } from "common/logger";
import { setAuthHeaders } from "apis/axios";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /*eslint no-undef: "off"*/
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <div>Home</div>} />
      </Switch>
    </Router>
  );
};

export default App;
