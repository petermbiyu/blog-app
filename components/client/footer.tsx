import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="my-10 flex mr-20 justify-end items-center gap-5">
        <Link
          href=""
          className="bg-gray-800 text-white text-xl p-4 rounded-full hover:bg-gray-500 transition-all duration-300 ease"
        >
          <FaFacebookF />
        </Link>
        <Link
          href=""
          className="bg-gray-800 text-white text-xl p-4 rounded-full hover:bg-gray-500 transition-all duration-300 ease"
        >
          <FaLinkedinIn />
        </Link>
        <Link
          href=""
          className="bg-gray-800 text-white text-xl p-4 rounded-full hover:bg-gray-500 transition-all duration-300 ease"
        >
          <FaYoutube />
        </Link>
      </div>
      <div className="flex justify-center items-center px-5 py-4 bg-gray-500 text-white font-bold">
        <p>
          &copy; copyright 2026 | All rights reserved | Mbiyu
          <span className="text-amber-400">Academics</span>
        </p>
      </div>
    </>
  );
};

export default Footer;
