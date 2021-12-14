import React, { useState, useEffect, createContext } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { either, isEmpty, isNil } from "ramda";
import { Redirect, Route, useLocation } from "react-router-dom";

import websiteApi from "apis/website";
import ArticleList from "components/EUI/ArticleList";
import Login from "components/EUI/Login";

const websiteContext = createContext();

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);

  const [passwordPresent, setPasswordPresent] = useState(true);
  const [websiteName, setWebsiteName] = useState("");

  const authToken = sessionStorage.getItem("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";
  const location = useLocation();
  const currentPath = location.pathname;

  const fetchWebsiteInfo = async () => {
    try {
      const response = await websiteApi.show();
      const { website } = response.data;
      setPasswordPresent(website.password_present);
      setWebsiteName(website.name);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebsiteInfo();
  }, []);

  if (loading) {
    return (
      <div className="py-10 mt-40">
        <PageLoader />
      </div>
    );
  }

  if (passwordPresent && !isLoggedIn && currentPath === "/public/articles") {
    return <Redirect to="/public/login" />;
  }

  if (passwordPresent && !isLoggedIn) {
    return (
      <websiteContext.Provider value={{ websiteName }}>
        <Route path="/public/login" component={Login} />
      </websiteContext.Provider>
    );
  }

  if (
    currentPath === "/public/login" &&
    (!passwordPresent || (passwordPresent && isLoggedIn))
  ) {
    return <Redirect to="/public/articles" />;
  }

  return (
    <websiteContext.Provider value={{ websiteName }}>
      <Route path="/public/articles" component={ArticleList} />
    </websiteContext.Provider>
  );
};

export default PrivateRoute;
export { websiteContext };
