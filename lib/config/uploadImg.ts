import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const imgUpload = async (image: File) => {
  const timestamp = Date.now();

  // extract byte data and create buffer
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);

  // sanitize the file name
  const sanitizedImgName = image.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const fileName = `${timestamp}_${sanitizedImgName}`;

  // resolve absolute server path
  const pubDir = path.join(process.cwd(), "public");
  const filePath = path.join(pubDir, fileName);
  // ensure path exist before upload
  await mkdir(pubDir, { recursive: true });
  // write to disk
  await writeFile(filePath, buffer);
  return fileName;
};
