import { FaTrash } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import Link from "next/link";
type Blog = {
  index: number;
  title: string;
  id: string;
  date: string;
  deleteBlogs: (id: string) => Promise<void>;
};
const BlogTableItems = ({ index, title, id, date, deleteBlogs }: Blog) => {
  const blogDate = new Date(date).toLocaleDateString();
  return (
    <tr>
      <td className="px-3 py-1">{index + 1}</td>
      <td className="px-3 py-1">{title}</td>
      <td className="px-3 py-1">{date ? blogDate : "24 Aug 2026"}</td>
      <td className="px-3 py-1">
        <Link href={`/admin/update-blog/${id}`}>
          <GrUpdate className="mx-auto text-green-500" />
        </Link>
      </td>
      <td className="px-3 py-1">
        <button className="cursor-pointer" onClick={() => deleteBlogs(id)}>
          <FaTrash className="mx-auto text-red-500" />
        </button>
      </td>
    </tr>
  );
};

export default BlogTableItems;
