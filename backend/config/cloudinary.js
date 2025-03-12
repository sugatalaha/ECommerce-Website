import { v2 as cloudinary } from 'cloudinary';

export const cloudinaryConfig=async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dhpyewj7n', 
        api_key: process.env.CLOUDINARY_API_NUMBER, 
        api_secret: process.env.API_SECRET 
    });
}