import mongoose from "mongoose";

const ModelSchema = new mongoose.Schema({
    name: String,
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }
});

const Model = mongoose.model('Model', ModelSchema);

export default Model;