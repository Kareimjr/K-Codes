import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://kareimjr:33778892@cluster0.wcleg.mongodb.net/food-delivery').then(()=>console.log("DB connected"));
}