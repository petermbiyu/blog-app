import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
const Navbar = () => {
  return (
    <div className="flex justify-between h-17 items-center px-5 py-4 bg-gray-500 text-white font-bold">
      <h2 className="flex-2 text-xl">
        MBIYU<span className="text-amber-400">ACADEMICS</span>
      </h2>
      <ul className="flex flex-6 justify-center items-center gap-5">
        <li>
          <Link
            href={"/"}
            className=" px-3 py-4 hover:border-b-5 border-amber-500"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href={"/about"}
            className="flex-6 px-3 py-4 hover:border-b-5 border-amber-500"
          >
            About
          </Link>
        </li>
      </ul>
      <div className="flex-1  h-17 flex items-center">
        <Link href={"#"} className="px-4 py-3 bg-amber-400">
          Connect <FaArrowRight className="inline-block" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
