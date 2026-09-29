"use client";
import BlogTableItems from "@/components/backend/blogTableItems";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Blogs = {
  title: string;
  id: string;
  createdAt: string;
  deleteBlogs: (id: string) => Promise<void>;
};

const AllBlogs = () => {
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const fetchAllBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      if (response.data.success) {
        setBlogs(response.data.blog);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Something went wrong";
        toast.error(message);
      }
    }
  };
  const deleteBlogs = async (id: string) => {
    const response = await axios.delete(`/api/blog`, {
      params: { id },
    });
    try {
      if (response.data.success) {
        fetchAllBlogs();
        toast.success(response.data.message);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };
  useEffect(() => {
    fetchAllBlogs();
  }, []);

  return (
    <div>
      <h2 className="text-center font-semibold text-2xl">All Blogs</h2>
      <div className="mt-10">
        <table className="w-3xl border border-collapse mx-auto">
          <thead className=" bg-amber-300 text-white text-left uppercase">
            <tr>
              <th className="px-6 py-1 w-[10%]">No.</th>
              <th className="px-6 py-1 w-[60%]">Title</th>
              <th className="px-6 py-1 w-[10%]">Date</th>
              <th className="px-6 py-1 w-[20%]" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {blogs.map((blog, index) => {
              return (
                <BlogTableItems
                  key={index}
                  index={index}
                  title={blog.title}
                  id={blog.id}
                  date={blog.createdAt}
                  deleteBlogs={deleteBlogs}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBlogs;
