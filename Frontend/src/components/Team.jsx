import React from 'react'
import Test from '../assets/images/Farmlink_imgs/test_team_member.jpg'
import '../styles/Team.css'
import Musa from '../assets/images/Farmlink_imgs/musa.jpg'
import Neo from '../assets/images/Farmlink_imgs/Neo.jpg'
import Sima from '../assets/images/Farmlink_imgs/sima.jpg'

export default function Team() {
  return (
    <div className="team-container" id="aboutUs">
        <div className="team-title">
            <h1>Meet The Team</h1>
        </div>
        <div className="team-members-container">
            <div className="team-member-container">
                <div className="member-img-container">
                    <img src={Musa} alt="" className="memberImg musa"/>
                </div>
                <div className="member-name-container">
                    <p className="member-name">Sicelumusa Gabuza</p>
                    <p className="member-role">Backend Developer</p>
                </div>
                <div className="member-duties">
                    <p>Responsible for setting up Node.js and Express server, design database schema, implement authentication using JSON Web Tokens and create API endpoints.</p>
                </div>
            </div>
            <div className="team-member-container">
                <div className="member-img-container">
                    <img src={Sima} alt="" className="memberImg sima"/>
                </div>
                <div className="member-name-container">
                    <p className="member-name">Simamnkele Njoli</p>
                    <p className="member-role">Backend Developer</p>
                </div>
                <div className="member-duties">
                    <p>Responsible for setting up Node.js and Express server, design database schema, implement authentication using JSON Web Tokens and create API endpoints.</p>
                </div>
            </div>
            <div className="team-member-container">
                <div className="member-img-container">
                    <img src={Neo} alt="" className="memberImg neo"/>
                </div>
                <div className="member-name-container">
                    <p className="member-name">Neo Masilo</p>
                    <p className="member-role">Frontend Developer</p>
                </div>
                <div className="member-duties">
                    <p>Responsible for designing the UI. Building the UI using React.Js, Implementing Axios to connect the Frontend and Backend.</p>
                </div>
            </div>
        </div>
    </div>
  )
}
