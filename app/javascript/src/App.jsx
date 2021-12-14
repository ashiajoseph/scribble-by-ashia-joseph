import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import PrivateRoute from "components/Common/PrivateRoute";
import Dashboard from "components/Dashboard";
import CreateArticle from "components/Landing/Articles/CreateArticle";
import EditArticle from "components/Landing/Articles/EditArticle";
import General from "components/Settings/General";
import ManageCategories from "components/Settings/ManageCategories";
import Redirections from "components/Settings/Redirections";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /*eslint no-undef: "off"*/
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="py-10 mt-40">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/settings/categories" component={ManageCategories} />
        <Route exact path="/settings/general" component={General} />
        <Route exact path="/settings/redirections" component={Redirections} />
        <Route exact path="/articles/new" component={CreateArticle} />
        <Route exact path="/articles/:articleId/edit" component={EditArticle} />

        <PrivateRoute />
      </Switch>
    </Router>
  );
};

export default App;
