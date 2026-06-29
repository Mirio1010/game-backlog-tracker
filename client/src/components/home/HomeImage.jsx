import React from 'react'
import imageSrc from "../../assets/homepage/videogames.jpg";
import "../../styles/hero.css";
import { GlowEffect } from '../motion-primitives/glow-effect';
const HomeImage = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <GlowEffect
        colors={["#6366f1", "#8b5cf6", "#06b6d4", "#6366f1"]}
        mode="breathe"
        blur="stronger"
        scale={1.15}
        duration={4}
        className="opacity-60"
      />

      <img
        className="Hero-image relative z-10"
        src={imageSrc}
        alt="Video Game Collection"
      />
    </div>
  );
}


export default HomeImage;