import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    address: {
        type: String,
        required: true
    }, 
    area: {
        type: String, 
        enum: ["North", "South", "East", "West"],
        required: true
    }, 
    category: {
        type: String, 
        enum: ["Food & Beverage", "Retail"]
    }, 
    description: {
        type: String,
        required: true
    }
})

export default mongoose.model("Company", companySchema);