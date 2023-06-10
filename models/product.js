const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ["fruit", "vegetable", "dairy"]
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop"
    }
});

module.exports = mongoose.model("Product", productSchema);
