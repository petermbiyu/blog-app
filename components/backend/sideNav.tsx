import React from "react";
import Link from "next/link";

const SideNav = () => {
  return (
    <>
      <div className="py-5 flex flex-col h-full items-end gap-5 bg-gray-500 text-white font-bold">
        <Link
          href={"/admin"}
          className="bg-amber-400 w-[90%] text-center py-3 mr-2"
        >
          Admin
        </Link>
        <Link
          href={"/admin/add-blog"}
          className="bg-amber-400 w-[90%] text-center py-3 mr-2"
        >
          Add Blog
        </Link>
        <Link
          href={"/admin/all-blogs"}
          className="bg-amber-400 w-[90%] text-center py-3 mr-2"
        >
          All Blogs
        </Link>
        <Link href={"#"} className="bg-amber-400 w-[90%] text-center py-3 mr-2">
          Subscribers
        </Link>
      </div>
    </>
  );
};

export default SideNav;
