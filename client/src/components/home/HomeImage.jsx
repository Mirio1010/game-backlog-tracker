import React from 'react'
import imageSrc from "../../assets/homepage/video_game_collection.png";
import "../../styles/hero.css";
const HomeImage = () => {
  return (
    <div >
      <img className='Hero-image' src={imageSrc} alt="Video Game Collection" />
    </div>
  );
}


export default HomeImage;