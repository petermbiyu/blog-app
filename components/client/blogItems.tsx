import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { assets } from "@/assets/assets";

type Blog = {
  id: number;
  title: string;
  category: string;
  description: string;
  slug: string;
  image: string;
};

const BlogItems = ({ id, title, category, description, slug, image }: Blog) => {
  return (
    <div className="w-75 shadow-[0px_4px_12px_rgba(0,0,0,0.2)]">
      <Link href={`/blog/${slug}`}>
        {" "}
        <Image
          src={`/${image}`}
          alt=""
          width={140}
          height={100}
          className="w-full"
        />
      </Link>

      <div className="my-4 px-2">
        <h3 className="text-sm mb-3 italic font-semibold text-amber-500">
          {category}
        </h3>
        <h2 className="font-bold text-xl">{title}</h2>
        <p dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}>
          {/* {description} */}
        </p>
        {/* <p className="my-2">{description}</p> */}
        <Link href={`/blog/${slug}`} className="font-semibold mt-10">
          Learn more...
        </Link>
      </div>
    </div>
  );
};

export default BlogItems;
