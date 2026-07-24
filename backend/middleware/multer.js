import multer from 'multer'

const storage = multer.memoryStorage();
// console.log(storage);
export const singleUpload = multer({
    storage
}).single("file");

