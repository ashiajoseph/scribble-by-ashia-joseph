import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { initializeLogger } from "common/logger";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /*eslint no-undef: "off"*/
    initializeLogger();
    
  }, []);



  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <div>Home</div>} />
      </Switch>
    </Router>
  );
};

export default App;
