import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
const NavAdmin = () => {
  return (
    <div className="flex justify-between h-17 items-center px-5 py-4 bg-gray-500 text-white font-bold">
      <Link href={"/"} className=" text-xl">
        MBIYU<span className="text-amber-400">ACADEMICS</span>
      </Link>

      <div className="  h-17 flex items-center">
        <Link href={"#"} className="px-4 py-3 bg-amber-400">
          Login <FaArrowRight className="inline-block" />
        </Link>
      </div>
    </div>
  );
};

export default NavAdmin;
