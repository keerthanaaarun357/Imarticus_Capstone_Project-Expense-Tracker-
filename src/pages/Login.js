import React, { useState, useEffect } from "react";
import { Form, Input, message, Checkbox, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./Login.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/users/login", values);
      setLoading(false);
      message.success("Welcome back, " + data.user.name + "!");
      const userData = { ...data.user, password: "" };
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        sessionStorage.setItem("user", JSON.stringify(userData));
      }
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Incorrect email or password. Please try again.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user") || sessionStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="login-page">
        {loading && <Spinner />}
        <div className="login-container">
          <h1 className="welcome-message">Welcome Back!</h1>
          <p className="tagline">
            We're happy to see you again. Please login to continue.
          </p>
          <Form layout="vertical" onFinish={submitHandler}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                visibilityToggle
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox onChange={(e) => setRememberMe(e.target.checked)}>
                Remember Me
              </Checkbox>
            </Form.Item>
            <div className="d-flex justify-content-between">
              <Link to="/forgot-password">Forgot Password?</Link>
              <Link to="/register">Not a user? Register Here</Link>
            </div>
            <Button type="primary" htmlType="submit" className="btn btn-primary">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
