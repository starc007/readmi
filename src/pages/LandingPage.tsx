import React from "react";
import { Link } from "react-router-dom";
import demo from "../assets/demo.png";

const LandingPage = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center md:mt-20 mt-16">
        <p className="sm:text-6xl text-[41px] font-bold leading-tight text-white text-center sm:leading-tight lg:leading-tight">
          The Easiest & Best way to <br className="lg:block hidden" /> create
          <span className="relative inline-flex sm:inline">
            <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
            <span className="relative"> README </span>
          </span>
        </p>
        <p className="text-gray-400 text-center mt-4 text-md md:text-xl max-w-2xl font-medium">
          Create your own README.md file in seconds, use existing templates or
          add predefined sections to your README.md file.
        </p>
        <div className="flex items-center space-x-2">
          <Link
            to="/editor"
            className="px-8 h-12 flex items-center text-lg text-white bg-blue-600 rounded-lg font-semibold mt-4 hover:bg-blue-700 transition-all duration-200"
          >
            Create
          </Link>
          <a
            href="https://github.com/sponsors/starc007"
            target="_blank"
            className="px-8 h-12 flex items-center text-lg text-white bg-white/10 rounded-lg font-semibold mt-4 hover:bg-white/5 transition-all duration-200"
          >
            Sponsor ❤️
          </a>
        </div>

        <div className="mt-28 mb-10 relative border border-gray-700 rounded-lg">
          <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
          <img className="transform " src={demo} alt="demo" />
        </div>
      </div>

      <div className="flex justify-center my-12">
        <p className="text-center text-white text-xl font-medium">
          Made with ❤️ by{" "}
          <a
            href="https://www.jutsu.tech"
            target="_blank"
            className="underline"
          >
            Saurabh
          </a>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
