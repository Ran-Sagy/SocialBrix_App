import React, { useEffect, useState } from "react";
import { Switch, Redirect, useHistory } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./Components/Utils/ProtectedRoute";
import { Layout } from "antd";
import Login from "./Components/Login/Login";
import TheHeader from "./Main_Components/TheHeader";
import { isUserConnected, login } from "./Services/userService";
// import loadingAnimation from "./assets/65395-blockchain-animation-2.json";
import loadingAnimation2 from "./assets/64390-social-media-icons.json";
import socialHero from "./assets/social-hero.json";
// import TheSidebar from "./Main_Components/TheSidebar";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setCurrentUserData } from "./actions/user.actions";
import Dashboard from "./Components/Dashboard/Dashboard";
import Lottie from "react-lottie-player";
import Analytics from "./Components/analytics/Analytics";
import { useAuth } from "@frontegg/react";
// import {  useAuthUser } from "@frontegg/react";

const { Content } = Layout;

function App() {
  const history = useHistory();
  const { user, isAuthenticated } = useAuth();
  // const user = useAuthUser();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const fetching = useSelector((state) => state.fetching);
  console.log("currentUser", currentUser);
  console.log("user", user);
  console.log("isAuthenticated", isAuthenticated);
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    const tryToLogin = async () => {
      const credentials = {
        name: user?.name,
        email: user?.email,
        accessToken: user?.accessToken,
        // accessToken: await getAccessTokenSilently(),
      };
      try {
        const loginSet = await login(credentials);
        const currentuser = {
          email: user?.email,
        };
        dispatch(setCurrentUserData(currentuser));
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // setLoading(false);
          console.log(error);
        }
      }
    };
    if (isAuthenticated) {
      tryToLogin();
    }
  }, []);

  // useEffect(() => {
  //   if (!isUserConnected() && !fetching) {
  //     console.log("no user");
  //     return <Redirect to="/account/login" />;
  //   }
  //   const getUser = async () => {
  //     setInitialLoad(true);
  //     setTimeout(async () => {
  //       const data = await isUserConnected();
  //       dispatch(setCurrentUser(data));
  //       setInitialLoad(false);
  //     }, 2000);
  //   };
  //   getUser();
  // }, []);

  // useEffect(() => {
  //   if (user) {
  //     dispatch(setCurrentUserData(user));
  //   }
  // }, [user, dispatch]);

  if (initialLoad) {
    return (
      <div className="loading-page">
        <div className="loading-animation">
          <Lottie
            loop
            play
            style={{ width: 300, height: 300, align: "center" }}
            animationData={socialHero}
          />
        </div>
      </div>
    );
  } else {
    if (user) {
      return (
        <Layout>
          {/* <TheSidebar /> */}
          <Layout>
            <TheHeader userDetails={currentUser} />
            <Content className="content">
              <Switch>
                <Analytics path={"/analytics"} user={user} />
                <Dashboard path={"/"} user={user} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      );
    } else
      return (
        <>
          {fetching ? "fetching..." : ""}
          {/* <Switch>
            <Login path="/removethis" />
          </Switch> */}
          <Redirect to="/account/login" />
        </>
      );
  }
}

export default App;
