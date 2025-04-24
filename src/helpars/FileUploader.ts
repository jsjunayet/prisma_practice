import multer from 'multer';
import path from "path";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(), 'upload'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
 const upload = multer({ storage: storage })


cloudinary.config({ 
    cloud_name: 'dztxlecbe', 
    api_key: '773959462347177', 
    api_secret: 'rkfy0P3Q-DPIx4iiJdLNrbCfcTA'
});

const uploadImage = async (file:any) => {
    try {
        const result = await cloudinary.uploader.upload(
            file.path,
            { public_id: file.originalname }
        );
        fs.unlinkSync(file.path)
        return result
    } catch (error) {
        fs.unlinkSync(file.path)
        console.error('Upload failed:', error);
    }
};
export const fileUploader = {
    upload,
    uploadImage
}