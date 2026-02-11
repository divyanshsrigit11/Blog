import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    // Ensure your connection string matches your MongoDB Atlas dashboard exactly
    url: `mongodb+srv://${username}:${password}@blogapp.pmsdvia.mongodb.net/?retryWrites=true&w=majority&appName=BlogApp`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        // 1. Fixed typos: "image/jpg" and "image/jpeg"
        const match = ["image/png", "image/jpg", "image/jpeg"];

        // 2. Fixed typo: Changed .memeType to .mimetype
        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-blog-${file.originalname}`;
        }

        // 3. This returns the configuration for GridFS
        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({ storage });
// import multer from 'multer';

// import { GridFsStorage } from 'multer-gridfs-storage';
// import dotenv from 'dotenv';

// dotenv.config();

// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;

// const storage = new GridFsStorage({
//     url: `mongodb+srv://${username}:${password}@blogapp.pmsdvia.mongodb.net/?retryWrites=true&w=majority&appName=BlogApp`,
//     options: {useNewUrlParser : true },
//     file: (request, file) => {
//         const match = ["image/png", "imgage/jpg"];

//         if (match.indexOf(file.memeType) === -1) {
//             return `${Date.now()}-blog-${file.originalname}`;
//         }

//         return {
//             bucketName: "photos",
//             filename: `${Date.now()}-blog-${file.originalname}`
//         }
//     }
// })

// export default multer({storage}); 
