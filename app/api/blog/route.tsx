import { NextRequest, NextResponse } from "next/server";
import { imgUpload } from "@/lib/config/uploadImg";
import { prisma } from "../../../lib/config/connectDB";
import path from "path";
import { unlink } from "fs/promises";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const slug = req.nextUrl.searchParams.get("slug");
  if (id) {
    const blog = await prisma.blog.findUnique({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true, blog });
  } else if (slug) {
    const blog = await prisma.blog.findUnique({ where: { slug: slug } });
    return NextResponse.json({ success: true, blog });
  } else {
    const blog = await prisma.blog.findMany();
    return NextResponse.json({ success: true, blog });
  }
}

// post request
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const slug = formData.get("slug") as string;
  const image = formData.get("image");

  if (!title || !category || !description || !slug) {
    return NextResponse.json(
      { success: false, message: "All fields are required" },
      { status: 400 },
    );
  }
  if (!(image instanceof File)) {
    return NextResponse.json(
      { success: false, message: "Please upload image..." },
      { status: 400 },
    );
  }
  // image upload
  const imgUrl = await imgUpload(image);

  const blogData = { title, category, description, slug, image: imgUrl };

  await prisma.blog.create({
    data: blogData,
  });
  return NextResponse.json(
    { success: true, message: "Uplaod Successfull" },
    { status: 201 },
  );
}

// patch
export async function PATCH(req: NextRequest) {
  // previous blog data
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      {
        success: false,
        message: "Slug is required...",
      },
      { status: 400 },
    );
  }
  const prevBlog = await prisma.blog.findUnique({
    where: { id: parseInt(id) },
  });
  if (!prevBlog) {
    return NextResponse.json(
      { success: false, message: "Blog not found..." },
      { status: 400 },
    );
  }

  //   current data for update
  const formData = await req.formData();
  const title = formData.get("title");
  const category = formData.get("category");
  const description = formData.get("description");
  const slug = formData.get("slug");
  const image = formData.get("image");

  if (
    !title ||
    typeof title !== "string" ||
    !category ||
    typeof category !== "string" ||
    !description ||
    typeof description !== "string" ||
    !slug ||
    typeof slug !== "string"
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "All fields are required...",
      },
      { status: 400 },
    );
  }
  let updateImg: string;
  const isNewImageUploaded = image instanceof File && image.size > 0;

  if (isNewImageUploaded) {
    updateImg = await imgUpload(image);
  } else {
    updateImg = prevBlog.image;
  }

  try {
    await prisma.blog.update({
      where: { id: parseInt(id) },
      data: { title, description, category, slug, image: updateImg },
    });
  } catch (error) {
    console.error("DB updated failed", error);
    return NextResponse.json(
      { success: false, message: "DB updated failed..." },
      { status: 500 },
    );
  }

  if (updateImg !== prevBlog.image && isNewImageUploaded) {
    const fileName = path.basename(prevBlog.image);
    const filePath = path.join(process.cwd(), "public", fileName);
    try {
      await unlink(filePath);
    } catch (error: any) {
      console.error("failed to delete image", error);
    }
  }

  return NextResponse.json({ success: true, message: "updated successfull" });
}

// delete
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { success: false, message: "Missing details.." },
      { status: 400 },
    );
  }
  const blogPost = await prisma.blog.findUnique({
    where: { id: parseInt(id) },
  });
  if (!blogPost) {
    return NextResponse.json({ success: false, message: "Missing blog..." });
  }
  const deletedBlog = await prisma.blog.delete({ where: { id: parseInt(id) } });
  if (deletedBlog) {
    const fileName = path.basename(blogPost.image);
    const filePath = path.join(process.cwd(), "public", fileName);
    try {
      await unlink(filePath);
    } catch (error) {
      console.error("failed to delete image", error);
    }
  }
  return NextResponse.json({ success: true, message: "Deleted successfully" });
}
