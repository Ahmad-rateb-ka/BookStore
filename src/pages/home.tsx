import "../style/master.css";
import Cards from "../components/card";
import AboutUs from "../components/AboutUs";
import Testimonials from "../components/Testimonials";
import Footer from "../components/footer";
import MainSection from "../components/MainSection";
import Navbar from "../components/Navbar";

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
