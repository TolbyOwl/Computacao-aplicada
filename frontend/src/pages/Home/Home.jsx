import React from 'react';
import { useHomeLogic } from './HomeLogic';
import { HomeHeader, HomeHero } from './HomeElements';
import './Home.css';

export default function Home() {
  // A lógica e o estado ficam isolados no hook
  const { title, handleStart } = useHomeLogic();

  // A renderização principal serve apenas para acomodar os elementos jsx
  return (
    <main className="home-container">
      <HomeHeader title={title} />
      <HomeHero onStart={handleStart} />
    </main>
  );
}
