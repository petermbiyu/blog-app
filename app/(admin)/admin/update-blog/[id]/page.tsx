"use client";
import { assets } from "@/assets/assets";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Editor from "@/components/shared/richText";

type Blog = {
  id: string;
  title: string;
  description: string;
  category: string;
  slug: string;
};

const UpdateBlog = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<Blog>({
    id: "",
    title: "",
    description: "",
    category: "Education",
    slug: "",
  });
  const [image, setImage] = useState<File | false>(false);
  const { id } = useParams<{ id: string }>();
  const fetchBlogPost = async () => {
    const response = await axios("/api/blog/", {
      params: { id },
    });
    setData(response.data.blog);
    setLoaded(true);
  };
  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmitHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("slug", data.slug);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.patch(
        `/api/blog?id=${encodeURIComponent(id)}`,
        formData,
      );
      if (response.data.success) {
        toast.success(response.data.message);
        router.push("/admin/all-blogs");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message ?? "Something went wrong";

        toast.error(message);
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      setData({
        id: "",
        title: "",
        category: "education",
        description: "",
        slug: "",
      });
      setImage(false);
    }
  };
  useEffect(() => {
    fetchBlogPost();
  }, []);

  return (
    <div className="mx-5 ">
      <h2 className="text-center font-semibold text-2xl">Update Blog</h2>
      <form
        action=""
        onSubmit={onSubmitHandler}
        className="my-5 w-full max-w-3xl mx-auto"
      >
        <input
          type="text"
          name="id"
          value={data.id}
          onChange={onChangeHandler}
          hidden
        />
        <div>
          <label htmlFor="title" className="mr-20 text-xl font-semibold">
            Title
          </label>
          <input
            type="text"
            placeholder="enter title"
            name="title"
            onChange={onChangeHandler}
            value={data.title}
            className="border  outline-none px-4 py-4 w-full border-amber-500 bg-white"
          />
        </div>

        <div className="mt-5">
          <label className="mr-20 text-xl font-semibold">Description</label>
          <Editor
            key={loaded ? data.id : "loading"}
            initialContent={data.description}
            onChange={(html) =>
              setData((prev) => ({ ...prev, description: html }))
            }
          />
        </div>

        <div className="mt-5">
          <p className="mr-20 text-xl font-semibold">Thumbnail</p>
          <label htmlFor="image" className="cursor-pointer">
            <Image
              src={!image ? assets.upload_area : URL.createObjectURL(image)}
              alt="thumbnail preview"
              width={140}
              height={80}
              className="w-35 h-20 object-cover rounded"
            />
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChangeImage}
            hidden
            className="border outline-none px-4 py-4 w-full"
          />
        </div>
        <div className="mt-5">
          <label htmlFor="category" className="mr-20 text-xl font-semibold">
            Category
          </label>
          <select
            id="category"
            name="category"
            onChange={onChangeHandler}
            value={data.category}
            className="border outline-none px-4 py-4 w-full border-amber-500 bg-white"
          >
            <option value="Education">Education</option>
          </select>
        </div>
        <div className="mt-5">
          <label htmlFor="slug" className="mr-20 text-xl font-semibold">
            Slug
          </label>
          <input
            type="text"
            name="slug"
            placeholder="enter slug"
            onChange={onChangeHandler}
            value={data.slug}
            className="border outline-none px-4 py-4 w-full border-amber-500 bg-white"
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="border outline-none mt-10 px-4 py-4 w-40 bg-amber-500 text-white font-semibold cursor-pointer"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
