// src/components/Home/Home.js

import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { login, register } from '../../services/apiService';
import './Home.css';

const Home = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
    setShowRegisterForm(false);
    setShowDetails(false);
  };

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
    setShowLoginForm(false);
    setShowDetails(false);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };

  const handleLogin = async (values) => {
    try {
      const response = await login(values);
      if (response && response.data) {
        console.log(response.data);
        message.success('Login successful');
      } else {
        throw new Error('Invalid response received from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error(error.message || 'Login failed');
    }
    window.location.href = '/dashboard';
  };

  const handleRegister = async (values) => {
    try {
      const response = await register(values);
      console.log(response);
      message.success('Registration successful');
    } catch (error) {
      console.error('Registration error:', error);
      message.error(error.message || 'Registration failed');
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to BioData Manager</h1>
        <p className="home-description">
          Your solution for efficient management of scientific projects.
        </p>
        <div className="home-buttons">
          <Button type="primary" size="large" className="home-button" onClick={toggleLoginForm}>
            Sign In
          </Button>
          <Button size="large" className="home-button" onClick={toggleRegisterForm}>
            Sign Up
          </Button>
        </div>
        {showDetails && (
          <div className="details-container">
            <div className="details-box">
              <h2 className="home-details-title">About BioData Manager</h2>
              <p className="home-details-description">
                BioData Manager is a comprehensive platform designed to streamline the management of scientific projects. 
                Our user-friendly interface and powerful features allow researchers to efficiently organize and analyze 
                metadata, track samples, document methods, manage references, and annotate data.
              </p>
              <p className="home-details-description">
                Whether you're conducting experiments in a laboratory, performing fieldwork, or collaborating with 
                colleagues, BioData Manager simplifies the research process, enabling you to focus more on 
                discovery and innovation.
              </p>
            </div>
          </div>
        )}
        <div className="see-details">
          <Button type="link" onClick={toggleDetails}>
            See More Details
          </Button>
        </div>
        {showLoginForm && (
          <div className="form-container">
            <h2>Login</h2>
            <Form onFinish={handleLogin}>
              <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
        {showRegisterForm && (
          <div className="form-container">
            <h2>Register</h2>
            <Form onFinish={handleRegister}>
              <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input type="email" />
              </Form.Item>
              <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
