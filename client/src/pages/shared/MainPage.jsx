import About from "../../components/common/About";
import Footer from "../../components/common/Footer";
import HeroSection from "../../components/common/HeroSection";
import Navbar from "../../components/common/Navbar";
import PopularCategories from "../../components/common/PopularCategories";
import Why_choose_us from "../../components/common/Why_choose_us";

export default function MainPage() {
  return (
    <div className="">
      <Navbar />
      <div className=" overflow-y-auto min-h-screen mt-20 mb-9">
        <div id="Hero" className="mb-20 md:mb-0">
          <HeroSection />
        </div>

        <div id="Popular-categories" className="p-3 mb-8 bg-background2">
          <PopularCategories />
        </div>
        <div id="whyChooseUs bg-background">
          <Why_choose_us />
        </div>
        <div id="About" className="bg-background2 my-14">
          <About />
        </div>
      </div>
      <Footer />
    </div>
  );
}
