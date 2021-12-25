import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Row, Col } from "antd";
import { notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { signup } from "../../Services/userService";

function Signup() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const openNotification = (placement) => {
    notification.info({
      message: "Whooops!",
      description: "User already registerd, try to login",
      placement,
      duration: 7,
    });
  };

  const onSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    const credentials = {
      name: values.fullName,
      email: values.email,
      password: values.password,
    };

    try {
      await signup(credentials);
      history.push("/user-dashboard");
    } catch (error) {
      if (error.response && error.response.data === "User already registerd") {
        openNotification("topRight");
      }
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <img
        style={{ padding: "10px" }}
        src="https://res.cloudinary.com/prodme-app-cloud-6/image/upload/v1635587114/Kaching/tresure.io_logo_nobg_e4kot2.png"
        alt="Logo"
        width="180px"
      />
      <Row>
        <Col xs={0} sm={10} md={10} lg={10} xl={14} />
        <Col className="signup-card" xs={24} sm={12} md={12} lg={12} xl={6}>
          <Row>
            <Col className="login-header" align="center" span={24}>
              Sign Up
            </Col>
          </Row>
          <Row style={{ marginTop: "2rem" }} align="center">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onSubmit}
            >
              <Form.Item
                name="fullName"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Full name"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter valid email" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item align="right" name="forgot">
                  <a className="login-form-forgot" href="/">
                    Forgot password
                  </a>
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Row>
                  {loading ? (
                    <Button type="primary" loading>
                      Loading
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Create acount
                    </Button>
                  )}
                </Row>
                <Row>
                  Or
                  <div
                    className="signup-link"
                    onClick={() => history.push("/login")}
                  >
                    {" "}
                    Login
                  </div>
                </Row>
              </Form.Item>
            </Form>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Signup;
