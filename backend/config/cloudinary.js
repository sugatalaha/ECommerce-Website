import { v2 as cloudinary } from 'cloudinary';

export const cloudinaryConfig=async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dhpyewj7n', 
        api_key: '158798313372216', 
        api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
    });
}