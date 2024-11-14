import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';


const images = [
    '/images/download(1).jpeg',  // Update paths based on your image locations
    '/images/download(2).jpeg',
    '/images/images.jpeg'
];

const Home = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/dashboard');
    };

    return (
        <div className="home">
            <h1>Welcome to Wings Cafe Inventory</h1>
            <p>
                Manage your inventory, track products, and monitor sales all in one place.
                Get real-time updates on stock levels and optimize your workflow.
            </p>

            {/* Slideshow */}
            <div className="slideshow-container">
                <Slide easing="ease" duration={3000} transitionDuration={500}>
                    {images.map((image, index) => (
                        <div className="each-slide" key={index}>
                            <img src={image} alt={`Slide ${index + 1}`} className="slide-image" />
                        </div>
                    ))}
                </Slide>
            </div>

            <button className="dashboard-button" onClick={handleRedirect}>
                Go to Dashboard
            </button>
        </div>
    );
};

export default Home;
