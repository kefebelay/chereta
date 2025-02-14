import About from "../../components/common/About";
import Footer from "../../components/common/Footer";
import HeroSection from "../../components/common/HeroSection";
import How_It_Works from "../../components/common/How_It_Works";
import Navbar from "../../components/common/Navbar";
import PopularCategories from "../../components/common/PopularCategories";
import Why_choose_us from "../../components/common/Why_choose_us";

export default function MainPage() {
  return (
    <div className="mx-2">
      <Navbar />
      <div className=" mt-20 mb-9">
        <div id="Hero" className="mb-24 md:mb-0">
          <HeroSection />
        </div>

        <div id="Popular-categories" className="p-3 mb-9 bg-background2">
          <PopularCategories />
        </div>
        <div id="whyChooseUs bg-background">
          <Why_choose_us />
        </div>
        <div id="About" className=" my-14 bg-background2">
          <About />
        </div>
        <div id="HowItWorks" className="">
          <How_It_Works />
        </div>
      </div>
      <Footer />
    </div>
  );
}
