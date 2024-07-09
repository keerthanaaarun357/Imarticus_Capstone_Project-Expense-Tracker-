import React from "react";
import Layout from "../components/Layouts/Layout";
import './HomePage.css'; // Custom CSS file

const HomePage = () => {
    return (
        <Layout>
            <div className="home-page">
                <div className="welcome-container">
                    <h1 className="welcome-message">Welcome to Your Dashboard!</h1>
                    <p className="intro-text">Stay organized and manage your tasks efficiently with our personalized TODO application.</p>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
