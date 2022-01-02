import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Row, Col } from "antd";
// import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "@frontegg/react";
import { useHistory } from "react-router-dom";
import { isUserConnected, login } from "../../Services/userService";
import Lottie from "react-lottie-player";
import socialHero3 from "../../assets/social-media-icons.json";

function Login() {
  const { loginWithRedirect, getAccessTokenSilently, user, isAuthenticated } =
    useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const goTo = () => {
    window.location = "http://localhost:8000";
  };

  useEffect(() => {
    const tryToLogin = async () => {
      const credentials = {
        name: user.name,
        email: user.email,
        accessToken: user.accessToken,
        // accessToken: await getAccessTokenSilently(),
      };
      try {
        await login(credentials);
        const userConnected = await isUserConnected();
        if (userConnected) {
          window.location = "/dashboard";
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setLoading(false);
          console.log(error);
        }
      }
    };
    if (user) {
      tryToLogin();
    }
  }, [user]);

  return (
    <div className="login">
      <Row>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <Row>
            <div className="header-logo">
              <img
                style={{ padding: "10px", cursor: "pointer" }}
                src="https://res.cloudinary.com/prodme-app-cloud-6/image/upload/v1639859653/SocialBrix__1_-removebg-preview_sj1aza.png"
                alt="Logo"
                height="72px"
                onClick={goTo}
              />
            </div>
          </Row>
          <div className="login-card">
            <Row>
              <Col className="login-header" align="center" span={24}>
                Login to your account
              </Col>
            </Row>
            <Col className="login-header" align="center" span={24}>
              <Button
                type="button"
                className="login-button"
                onClick={loginWithRedirect}
              >
                Redirect
              </Button>
            </Col>
          </div>
        </Col>

        <Col className="login-hero" xs={18}>
          <div className="login-lottie">
            <Lottie
              loop
              play
              speed={0.7}
              style={{ width: 800, height: 700, align: "center" }}
              animationData={socialHero3}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
