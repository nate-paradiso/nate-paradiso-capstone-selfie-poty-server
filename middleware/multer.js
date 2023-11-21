import multer from "multer";
import path from "path";

export const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "public/images");
  },
  filename: (req, file, callBack) => {
    callBack(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});
export const uploadMulter = multer({
  storage: storage,
});
