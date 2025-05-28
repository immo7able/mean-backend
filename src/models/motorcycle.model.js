import mongoose from 'mongoose'

const motorcycleSchema = new mongoose.Schema(
    {
        description: {type: String, required: true, trim: true},
        price: {type: Number, required: true},
        brand: {type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true},
        model: {type: mongoose.Schema.Types.ObjectId, ref: 'Model', required: true},
        year: {type: Number, required: true},
        engineVolume: {type: Number, required: true},
        mileage: {type: Number, required: true},
        images: [{type: String}],
        city: {type: String, required: true},
        owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        isSold: {type: Boolean, default: false},
        favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    },
    {timestamps: true}
)

const Motorcycle = mongoose.model('Motorcycle', motorcycleSchema)
export default Motorcycle
