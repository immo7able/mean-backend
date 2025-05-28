import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({name: String});

const Brand = mongoose.model('Brand', BrandSchema);
export default Brand;
