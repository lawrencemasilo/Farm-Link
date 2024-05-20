import React from 'react'
import '../styles/Hero.css'
import { useNavigate } from 'react-router-dom'

export default function Hero() {

  const navigate = useNavigate();

  return (
    <div className="hero-container">
        <div className="hero-wrapper">
            <div className="title-container">
                <h1 className="title">Empowering... Revolutionzing Agriculture</h1>
            </div>
            <div className="description-container">
                <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a nunc dui. Proin dui eros, fermentum sed ultricies eget, rhoncus sit amet libero. Donec sed efficitur lectus, posuere feugiat nisi.</p>
            </div>
            <div className="hero-btn-container">
                <button className="get_started-btn" onClick={() => navigate("/register")}>Get started</button>
                <button className="learn_more-btn" onClick={() => navigate("/aboutus")}>Learn More</button>
            </div>
        </div>
    </div>
  )
}
