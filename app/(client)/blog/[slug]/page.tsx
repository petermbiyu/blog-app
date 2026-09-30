"use client";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
type BlogPost = {
  title: string;
  description: string;
  category: string;
  slug: string;
  image: string;
};

const Blog = () => {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const { slug } = useParams<{ slug: string }>();
  const fetchBlog = async () => {
    try {
      const response = await axios.get("/api/blog/", {
        params: { slug },
      });
      if (response.data.success) {
        setBlog(response.data.blog);
      }
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message ?? "something went wrong")
        : "Unexpected error";
      console.error(message, error);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, [slug]);
  if (!blog) {
    return (
      <>
        <div className="w-full flex flex-col justify-center items-center min-h-[calc(100vh-258px)]">
          <h1 className="text-2xl font-bold ">Loading...</h1>
          <p className="text-[1.1rem] font-semibold italic text-amber-400">
            Please wait as we get your requested content
          </p>
        </div>
      </>
    );
  }
  return (
    <div>
      <div className="bg-gray-500 text-white text-center pt-5 pb-50">
        <h1 className="text-4xl font-bold">{blog.title}</h1>
      </div>
      <div className="w-full max-w-200 mx-auto -mt-40 border-4 border-white">
        <Image src={`/${blog.image}`} alt="" width={1280} height={660} />
        <h3 className="text-[0.9rem] font-semibold italic text-amber-400">
          {blog.category}
        </h3>
        <p dangerouslySetInnerHTML={{ __html: blog.description }}>
          {/* {blog.description} */}
        </p>
      </div>
    </div>
  );
};

export default Blog;
