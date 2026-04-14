import React from 'react'
import HomeImage from "./HomeImage.jsx";
import LoginBtn from "../ui/LoginBtn.jsx";
import SignupBtn from "../ui/SignupBtn.jsx";

import "../../styles/hero.css";
const Hero = () => {
  return (
    <div className="Hero">
      <h1>Destroy your game backlog one step at a time</h1>
      <p>
        Welcome to Game Backlog Tracker, the ultimate tool for gamers who want
        to conquer their game backlog and stay organized. With an intuitive
        interface and powerful features, you can easily manage your game
        collection, track your progress, and discover new games to play.
      </p>
      <HomeImage />
      <LoginBtn />
      <SignupBtn />
    </div>
  );
}

export default Hero