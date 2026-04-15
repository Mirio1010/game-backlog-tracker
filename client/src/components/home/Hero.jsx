import React from 'react'
import HomeImage from "./HomeImage.jsx";
import LoginBtn from "../ui/LoginBtn.jsx";
import SignupBtn from "../ui/SignupBtn.jsx";

import "../../styles/hero.css";
import GetStartedBtn from './GetStartedBtn.jsx';
const Hero = () => {
 return (
   <section className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-slate-900 to-black text-white">
     <div className="mx-auto grid min-h-[90vh] max-w-7xl items-center gap-12 px-6 py-16 md:px-10 lg:grid-cols-2 lg:gap-20 lg:px-16">
       <div className="space-y-6">
        

         <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
           Destroy your game backlog
           <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
             one step at a time
           </span>
         </h1>

         <p className="max-w-xl text-base leading-8 text-zinc-300 sm:text-lg">
           Welcome to Game Backlog Tracker, the ultimate tool for gamers who
           want to conquer their game backlog and stay organized. Manage your
           collection, track your progress, and discover new games to play in
           one clean dashboard.
         </p>

         <div className="flex flex-col gap-4 sm:flex-row">
           <GetStartedBtn/>
         </div>
       </div>

       <div className="relative flex items-center justify-center">
         <div className="absolute -left-10 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>
         <div className="absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"></div>

         <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
           <HomeImage />
         </div>
       </div>
     </div>
   </section>
 );
}

export default Hero