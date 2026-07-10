import { HomeHero } from './home/HomeHero';
import { HomeStats } from './home/HomeStats';
import { HomeFeatures } from './home/HomeFeatures';
import { HomeMedicalChecks } from './home/HomeMedicalChecks';
import { HomePricing } from './home/HomePricing';
import { HomeCTA } from './home/HomeCTA';

export const Home = () => {
  return (
    <div
      className="min-h-screen bg-white dark:bg-slate-950"
      aria-labelledby="main-heading"
    >
      <HomeHero />
      <HomeStats />
      <HomeFeatures />
      <HomeMedicalChecks />
      <HomePricing />
      <HomeCTA />
    </div>
  );
};
