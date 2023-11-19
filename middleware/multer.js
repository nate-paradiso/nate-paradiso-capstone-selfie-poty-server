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
const maxSizeBytes = 5000000;
export const uploadMulter = multer({
  storage: storage,
  limits: { fieldSize: maxSizeBytes },
});

// const fileFilterMiddleware = (req, file, cb) => {
//   const fileSize = parseInt(req.headers["content-length"]);

//   if (
//     (file.mimetype === "image/png" ||
//       file.mimetype === "image/jpg" ||
//       file.mimetype === "image/jpeg" ||
//       file.mimetype === "application/octet-stream") &&
//     fileSize <= 5000
//   ) {
//     cb(null, true);
//   } else if (file.mimetype === "video/mp4" && fileSize <= 22282810) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
