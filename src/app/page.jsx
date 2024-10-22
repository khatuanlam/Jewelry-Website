'use client'

import HeroSection from "../components/RootLayout/Hero";
import Footer from "./ui/RootLayout/Footer";

// `app/page.js` is the UI for the `/` URL
export default function Home() {
  return (
    <>
      <HeroSection />
      <Footer />
    </>
  );
}