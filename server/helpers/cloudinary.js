const cloudinary= require('cloudinary').v2;
const multer= require('multer');

cloudinary.config({
  cloud_name: "dhmi30vfv",
  api_key: "782144313947388",
  api_secret: "m-aJNJHWy17eSedXzHUM9ybPKhI", //m-aJNJHWy17eSedXzHUM9ybPKhI
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file){
  const result= await cloudinary.uploader.upload(file,
    { resource_type:'auto'});
  return result;
}
const upload= multer({storage});

module.exports= {
  upload,
  imageUploadUtil
}