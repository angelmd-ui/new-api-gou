// const cloudinary = require('cloudinary');
// const dotenv=require('dotenv');

// dotenv.config();
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_ID,
//     api_secret: process.env.API_SECRET 
// })
// exports.uploads = (file) => {
//     return new Promise(resolve => {
//         cloudinary.uploader.upload(file, (result) => {
//             resolve({
//                 url: result.url,
//                 id: result.public_id
//             })
//         }, {
//             resource_type: "auto",
            
//         })
//     })
// }


