import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

  const submitHandler = async (registerData) => {
  try {
    console.log(registerData);
    setLoading(true);
    const response = await axios.post("/users/register", registerData);
    // Handle successful registration based on server response (e.g., token)
    message.success("Registration Successful! Welcome aboard!");
    setLoading(false);
    navigate("/login");
  } catch (error) {
    setLoading(false);
    console.error(error);
    if (error.response && error.response.status === 400) {
      message.error("Invalid registration data. Please check your information.");
    } else {
      message.error("Something went wrong. Please try again.");
    }
  }
};


    //Prevent logged-in user from accessing register page
    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <>
            <div className="register-page">
                {loading && <Spinner />}
                <div className="register-container">
                    <h1 className="welcome-message">Join Us!</h1>
                    <p className="tagline">Create your account to get started.</p>
                    <Form layout="vertical" onFinish={submitHandler}>
                        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input type="email" />
                        </Form.Item>
                        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input type="password" />
                        </Form.Item>
                        <div className="d-flex justify-content-between">
                            <Link to="/login">Already registered? Login here</Link>
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Register;
