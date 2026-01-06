import mongoose from "mongoose"



export const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@blogapp.pmsdvia.mongodb.net/?retryWrites=true&w=majority&appName=BlogApp`;
    try{
        // await mongoose.connect(URL, { useNewUrlParser: true });
        await mongoose.connect(URL);
        console.log('Database connected Successfully');
    } catch (error) {
        console.log('Error while connecting Database', error);
    }
}

export default Connection;