import React, { useState, useEffect, createContext } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import redirectionsApi from "apis/redirections";
import { initializeLogger } from "common/logger";
import PrivateRoute from "components/Common/PrivateRoute";
import Dashboard from "components/Dashboard";
import CreateArticle from "components/Landing/Articles/CreateArticle";
import EditArticle from "components/Landing/Articles/EditArticle";
import General from "components/Settings/General";
import ManageCategories from "components/Settings/ManageCategories";
import Redirections from "components/Settings/Redirections";

const redirectionContext = createContext();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [redirectionList, setRedirectionList] = useState([]);
  const fetchRedirectionList = async () => {
    try {
      const response = await redirectionsApi.list();
      const { redirection_list } = response.data;
      setRedirectionList(redirection_list);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    /*eslint no-undef: "off"*/
    initializeLogger();
    registerIntercepts();
    setAuthHeaders();
    fetchRedirectionList();
  }, []);

  if (loading) {
    return (
      <div className="py-10 mt-40">
        <PageLoader />
      </div>
    );
  }

  return (
    <redirectionContext.Provider
      value={{ redirectionList, setRedirectionList, fetchRedirectionList }}
    >
      <Router>
        <ToastContainer />
        <Switch>
          {redirectionList.map(({ from, to }, index) => (
            <Redirect key={index} from={from} to={to} />
          ))}
          <Route exact path="/" component={Dashboard} />
          <Route
            exact
            path="/settings/categories"
            component={ManageCategories}
          />
          <Route exact path="/settings" component={General} />
          <Route exact path="/settings/redirections" component={Redirections} />
          <Route exact path="/articles/new" component={CreateArticle} />
          <Route
            exact
            path="/articles/:articleId/edit"
            component={EditArticle}
          />

          <PrivateRoute />
        </Switch>
      </Router>
    </redirectionContext.Provider>
  );
};

export default App;
export { redirectionContext };
