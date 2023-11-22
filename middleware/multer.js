import multer from "multer";

import path from "path";

import DatauriParser from "datauri/parser.js";

export const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).single("image");

const parser = new DatauriParser();

const dataUri = req => {
  console.log(req.file);
  return parser.format(path.extname(req.file.originalname).toString(), req.file.buffer).content;
};
export { multerUploads, dataUri };
