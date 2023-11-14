import multer from "multer";
import path from "path";

export const storage = multer.diskStorage({
  destination: (req, file, db) => {
    db(null, "public/images");
  },
  filename: (req, file, db) => {
    db(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

export const uploadMulter = multer({
  storage: storage,
});
