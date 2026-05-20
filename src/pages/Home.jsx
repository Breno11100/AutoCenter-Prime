import Header from "../components/Header/Header";
import HeroCarousel from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import WhatsAppButton from "../components/WhatsAppButton/WhatsAppButton";

function Home() {
  return (
    <>
      <Header />
      <HeroCarousel />
      <Services />
      <About />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default Home;