import { Link } from "react-router-dom";

export default function Footer() {
  const date = new Date().getFullYear();

  function handleClick() {
    const aboutSection = document.getElementById("About");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error('Element with id "About" not found');
    }
  }
  function handleClickH() {
    const aboutSection = document.getElementById("HowItWorks");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error('Element with id "HowItWorks" not found');
    }
  }
  function handleClickW() {
    const aboutSection = document.getElementById("WhyChooseUs");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error('Element with id "WhyChooseUs" not found');
    }
  }
  return (

    <footer className="bg-gray-800 px-4 md:px-16 lg:px-28">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-lg font-bold mb-4">
            About Us
          </h2>
          <p className="text-gray-300">
          Chereta is an Ethiopian made online marketplace where buyers and sellers from all over the world can either bid on items or list items so that buyers can bid on it.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-boldmb-4">Quick Links</h2>
          <ul>
            <li className="bg-transparent">
            <Link
                      className="text-md hover:text-accent bg-none bg-transparent"
                      to={"/#About"}
                      onClick={handleClick}
                    >
                      About
                    </Link>
                      </li>
                      <li className="bg-transparent">
                      <Link
                      className="text-md hover:text-accent bg-none bg-transparent"
                      to={"/#HowItWorks"}
                      onClick={handleClickH}
                    >
                       How It Works
                    </Link>
                        
                      </li>
                      <li className="bg-transparent">
                      <Link
                      className="text-md hover:text-accent bg-none bg-transparent"
                      to={"/#WhyChooseUs"}
                      onClick={handleClickW}
                    >
                       Why Choose Us
                    </Link>
                        
                      </li>
          </ul>
        </div>
        <div></div>
      </div>
      <p>
        @ <span className="text-accent>">Chereta</span> {date}
      </p>
    </footer>
  );
}
