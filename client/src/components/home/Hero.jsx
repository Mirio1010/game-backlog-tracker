import React from "react";
import HomeImage from "./HomeImage.jsx";
import LoginBtn from "../ui/LoginBtn.jsx";
import SignupBtn from "../ui/SignupBtn.jsx";

import "../../styles/hero.css";
import GetStartedBtn from "./GetStartedBtn.jsx";

import { TextEffect } from "../motion-primitives/text-effect.jsx";
import { Magnetic } from "../motion-primitives/magnetic.jsx";
const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-surface to-background text-foreground">
      <div className="mx-auto grid min-h-[80vh] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 md:px-10 lg:min-h-[90vh] lg:grid-cols-2 lg:gap-20 lg:px-16">
        <div className="space-y-5 sm:space-y-6">
          <TextEffect
            as="h1"
            per="line"
            preset="fade-in-blur"
            speedReveal={0.1}
            speedSegment={0.4}
            className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            getSegmentClassName={(segment, index) =>
              index === 1
                ? "bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                : ""
            }
          >
            {"Destroy your game backlog\none step at a time"}
          </TextEffect>

          <p className="max-w-xl text-sm leading-7 text-muted sm:text-base sm:leading-8 lg:text-lg">
            Welcome to Game Backlog Tracker, the ultimate tool for gamers who
            want to conquer their game backlog and stay organized. Manage your
            collection, track your progress, and discover new games to play in
            one clean dashboard.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Magnetic intensity={0.5} actionArea="global" range={100}>
              <GetStartedBtn />
            </Magnetic>
          </div>
        </div>

        {/* Home Image */}

        <div className="relative flex items-center justify-center">
          <div className="absolute -left-10 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>
          <div className="absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"></div>

          <div className="relative w-full max-w-xl rounded-3xl border border-border bg-card p-2 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-4">
            <HomeImage />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
