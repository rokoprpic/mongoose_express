const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const Product = require("./product");

const shopSchema = new Schema({
    name: {
        type: String,
        required: [true, "Shop must have a name"]
    },
    location: {
        type: String
    },
    email: {
        type: String,
        required: [true, "email required"]
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
});


shopSchema.post("findOneAndDelete", async function(shop) {
    console.log(shop);
    if(shop.products.length){
        const res = await Product.deleteMany({_id:{$in: shop.products}});
        console.log(res);
    }
});

module.exports = mongoose.model("Shop", shopSchema);