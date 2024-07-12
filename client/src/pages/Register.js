import React, { useState, useEffect } from "react";
import { Form, Input, message, Checkbox, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const submitHandler = async (values) => {
        if (values.password !== values.confirmPassword) {
            message.error("Passwords do not match!");
            return;
        }
        try {
            console.log(values);
            setLoading(true);
            await axios.post("/api/v1/users/register", values);
            message.success("Registration Successful! Welcome aboard!");
            setLoading(false);
            navigate("/login");
        } catch (error) {
            setLoading(false);
            console.log(error);
            message.error("Something went wrong. Please try again.");
        }
    };

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
                            <Input.Password
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                visibilityToggle
                            />
                        </Form.Item>
                        <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ required: true, message: 'Please confirm your password!' }]}>
                            <Input.Password
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                visibilityToggle
                            />
                        </Form.Item>
                        <Form.Item name="terms" valuePropName="checked" rules={[{ required: true, message: 'Please accept the terms and conditions!' }]}>
                            <Checkbox>
                                I accept the <Link to="/terms">terms and conditions</Link>
                            </Checkbox>
                        </Form.Item>
                        <div className="d-flex justify-content-between">
                            <Link to="/login">Already registered? Login here</Link>
                            <Button type="primary" htmlType="submit">Register</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Register;
