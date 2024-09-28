import foodModel from "../models/foodModels.js";
import fs from 'fs';
import mongoose from "mongoose";

// Add food item
const addFood = async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.json({ success: false, message: "Image is required" });
        }

        let image_filename = req.file.filename;

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        });

        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// all food list 

const listFood = async (req, res) => {
    try {
        const food = await foodModel.find({});
        res.json({ success: true, data: food })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}

//  remove food item


const removeFood = async (req, res) => {
    try {
        const foodId = new mongoose.Types.ObjectId(req.body.id);

        const food = await foodModel.findById(foodId);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        console.log('Image to delete:', food.image);

        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.log(`Failed to delete image: ${err.message}`);
            }
        });

        await foodModel.findByIdAndDelete(foodId);

        res.json({ success: true, message: 'Food Removed' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "Error" });
    }
};


export { addFood, listFood, removeFood };