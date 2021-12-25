import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Row, Col } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { isUserConnected, login } from "../../Services/userService";

function Login() {
  const { loginWithRedirect, getAccessTokenSilently, user, isAuthenticated } =
    useAuth0();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tryToLogin = async () => {
      const credentials = {
        name: user.name,
        email: user.email,
        accessToken: await getAccessTokenSilently(),
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
      <img
        style={{ padding: "10px" }}
        src="https://res.cloudinary.com/prodme-app-cloud-6/image/upload/c_scale,w_180/v1639246483/Kaching/Social_Brix_Logo-removebg_uejbgv.png"
        alt="Logo"
        width="120px"
      />
      <Row>
        <Col className="login-card" xs={24} sm={12} md={12} lg={12} xl={6}>
          <Row>
            <Col className="login-header" align="center" span={24}>
              Login / Sign up
            </Col>
          </Row>
          <Row>
            <Col className="login-header" align="center" span={24}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={loginWithRedirect}
              >
                Redirect
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
