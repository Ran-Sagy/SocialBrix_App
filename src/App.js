import React, { useEffect, useState } from "react";
import { Switch, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./Components/Utils/ProtectedRoute";
import { Layout } from "antd";
import Login from "./Components/Login/Login";
import TheHeader from "./Main_Components/TheHeader";
import { isUserConnected } from "./Services/userService";
// import loadingAnimation from "./assets/65395-blockchain-animation-2.json";
import loadingAnimation2 from "./assets/64390-social-media-icons.json";
import socialHero from "./assets/social-hero.json";
// import TheSidebar from "./Main_Components/TheSidebar";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setCurrentUserData } from "./actions/user.actions";
import Dashboard from "./Components/Dashboard/Dashboard";
import { setFetchingStage } from "./actions/fetching.actions";
import Lottie from "react-lottie-player";
import { fetchInstagranData } from "./Services/instagramService";
import Analytics from "./Components/analytics/Analytics";

const { Content } = Layout;

function App() {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const fetching = useSelector((state) => state.fetching);
  console.log("currentUser", currentUser);
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    if (!isUserConnected() && !fetching) {
      console.log("no user");
      return <Redirect to="/login" />;
    }
    const getUser = async () => {
      setInitialLoad(true);
      setTimeout(async () => {
        const data = await isUserConnected();
        dispatch(setCurrentUser(data));
        setInitialLoad(false);
      }, 2000);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(setCurrentUserData(user));
    }
  }, [user, dispatch]);

  useEffect(() => {}, []);

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
    if (Object.values(currentUser).length > 0) {
      return (
        <Layout>
          {/* <TheSidebar /> */}
          <Layout>
            <TheHeader userDetails={currentUser} />
            <Content className="content">
              <Switch>
                <Dashboard path={"/dashboard"} user={user} />
                <Analytics path={"/analytics"} user={user} />
                {/* <ProtectedRoute
                path={"/campaigns"}
                component={<Campaigns />}
                permission={"company"}
              /> */}
              </Switch>
            </Content>
          </Layout>
        </Layout>
      );
    } else
      return (
        <>
          {fetching ? "fetching..." : ""}
          <Switch>
            <Login path="/" />
          </Switch>
        </>
      );
  }
}

export default App;
