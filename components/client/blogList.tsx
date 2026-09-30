"use client";

import Link from "next/link";
import { assets } from "@/assets/assets";
import { blog_data } from "@/assets/assets";
import BlogItems from "./blogItems";
import { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import axios from "axios";
type Blog = {
  id: number;
  title: string;
  category: string;
  description: string;
  slug: string;
  image: string;
};

const BlogList = () => {
  const [data, setData] = useState<Blog[] | false>(false);
  const fetchAllData = async () => {
    const response = await axios.get("/api/blog");
    try {
      if (response.data.success) {
        setData(response.data.blog);
      }
    } catch (error) {
      const message = response?.data?.message || "Error retriving data";
      console.log(message);
    }
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
                slug={blog.slug}
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
