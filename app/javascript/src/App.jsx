import React, { useState, useEffect } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import Dashboard from "components/Dashboard";
import CreateArticle from "components/Landing/Articles/CreateArticle";
import EditArticle from "components/Landing/Articles/EditArticle";
import General from "components/Settings/General";
import ManageCategories from "components/Settings/ManageCategories";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /*eslint no-undef: "off"*/
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/settings/categories" component={ManageCategories} />
        <Route exact path="/settings/general" component={General} />
        <Route exact path="/articles/new" component={CreateArticle} />
        <Route exact path="/articles/:articleId/edit" component={EditArticle} />
      </Switch>
    </Router>
  );
};

export default App;
