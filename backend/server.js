import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
  api_key: process.env.CLOUDINARY_API_KEY, 
});

app.listen(process.env.PORT, () => { 
  console.log(`Server is running on port ${process.env.PORT}`);
});
