"use client";
import { assets } from "@/assets/assets";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import Editor from "@/components/shared/richText";

const AddBlog = () => {
  const router = useRouter();
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Education",
    slug: "",
  });
  const [image, setImage] = useState<File | false>(false);
  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
    if (!image) {
      toast.error("Please upload image...");
      return;
    }
    if (!data.title || !data.description || !data.category || !data.slug) {
      toast.error("Please fill all the text fields");
      return;
    }
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("slug", data.slug);
    formData.append("image", image);

    try {
      const response = await axios.post("/api/blog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.success) {
        toast.success(response.data.message);

        setData({
          title: "",
          category: "education",
          description: "",
          slug: "",
        });
        setImage(false);

        router.push("/admin/all-blogs");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message ?? "Something went wrong";
        toast.error(message);
      } else {
        toast.error("Unexpected error");
      }
    }
  };

  return (
    <div className="mx-5 ">
      <h2 className="text-center font-semibold text-2xl">Add Blog</h2>
      <form
        action=""
        onSubmit={onSubmitHandler}
        className="my-5 w-full max-w-3xl mx-auto"
      >
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
        {/* <div className="mt-5">
          <label htmlFor="description" className="mr-20 text-xl font-semibold">
            Description
          </label>
          <textarea
            rows={6}
            name="description"
            placeholder="Type description here..."
            onChange={onChangeHandler}
            value={data.description}
            className="border outline-none px-4 py-4 w-full border-amber-500 bg-white"
          />
        </div> */}

        <div className="mt-5">
          <label className="mr-20 text-xl font-semibold">Description</label>
          <Editor
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
            required
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
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
