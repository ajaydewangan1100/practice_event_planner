import fs from "fs/promises";
import cloudinary from "../config/cloudinaryConfig.js";

export default async function cloudinaryUpload(file) {
  try {
    const result = await cloudinary.v2.uploader.upload(file.path);

    // console.log("RESULT : ", result);

    if (!result) {
      return false;
    }

    return result;
  } catch (e) {
    return false;
  } finally {
    // remove file from server
    fs.rm(`uploads/${file.filename}`);
  }
}
