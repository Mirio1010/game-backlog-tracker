import React from "react";
import Hero from "../components/home/Hero.jsx";
import Footer from "../components/home/Footer.jsx";
import Header from "../components/home/Header.jsx";
import MainLayout from "../components/layout/MainLayout.jsx";
const Home = () => {
  return (
    <MainLayout>
      <Header />
      <Hero />
      <Footer />
    </MainLayout>
  );
};

export default Home;
