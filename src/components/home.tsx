import "../services/master.css";
import Cards from "./card";
import AboutUs from "./AboutUs";
import Testimonials from "./Testimonials";
import Footer from "./footer";
import MainSection from "./MainSection";
import Navbar from "./Navbar";

function Home() {
  return (
    <>
      <div className="container-home">
        <Navbar />
        <MainSection />
        <Cards />
        <AboutUs />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
}
export default Home;
