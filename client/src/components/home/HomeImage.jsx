import React from 'react'
import imageSrc from "../../assets/homepage/video_game_collection.png";
import "../../styles/hero.css";
const HomeImage = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <img className="Hero-image" src={imageSrc} alt="Video Game Collection" />
    </div>
  );
}


export default HomeImage;