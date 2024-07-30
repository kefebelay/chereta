
export default function HeroSection() {
  return (
    <div className="flex md:ml-28 sm:mb-20 md:mb-0">
          <div className=" md:mt-28 px-3">
            <h1 className=" md:text-5xl text-3xl font-extrabold text-center">Find It,
             <span className=" text-accent">Bid </span>It, Own It, Transforming 
              E-Commerce with <span className="text-accent">Auctions</span>
              </h1>
              <img src='/assets/img/hero-section-img.svg'
               alt="Online Bidding vector image"
                className="size-40 md:hidden mx-auto"/>

              <div className="mt-6 mx-11 md:mx-0 md:flex md:gap-4 justify-center">
                <button className="btn bg-secondary shadow-lg w-full md:w-auto mb-4 md:mb-auto">How does it work?</button>
                <button className="btn bg-primary shadow-lg w-full md:w-auto text-white">Get started</button>
              </div>
          </div>
          <div className="hidden md:block ml-20">
            <img src='/assets/img/hero-section-img.svg' alt="Online Bidding vector image" className="heroImage pl-6 mt-10 ml-9"/>
          </div>
          
        </div>
  )
}
