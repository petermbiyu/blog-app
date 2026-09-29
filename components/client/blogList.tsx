"use client";

import Link from "next/link";
import { assets } from "@/assets/assets";
import { blog_data } from "@/assets/assets";
import BlogItems from "./blogItems";
import { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
type Blog = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: StaticImageData;
};

const BlogList = () => {
  const [data, setData] = useState<Blog[] | null>(null);
  const fetchAllData = () => {
    setData(blog_data);
  };
  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mt-10">All Blogs</h2>
      <div className="mt-5 flex flex-wrap gap-5 mx-10">
        {data ? (
          data.map((blog, index) => {
            return (
              <BlogItems
                key={index}
                id={blog.id}
                title={blog.title}
                description={blog.description}
                category={blog.category}
                image={blog.image}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default BlogList;
