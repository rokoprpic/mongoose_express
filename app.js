const express =  require("express");
const app =  express();
const path = require("path");
const mongoose = require('mongoose');
const Product = require("./models/product");
const Shop = require("./models/shop");
const methodOveride = require("method-override");
const product = require("./models/product");

mongoose.connect('mongodb://127.0.0.1:27017/shops')
.then(() => {
    console.log("Connection sucess!!!")
})
.catch(err => {
    console.log(err);
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOveride("_method"));


//home route
app.get("/", (req, res) => {
    res.render("home");
});


//shop routes
app.get("/shops", async (req, res) => {
    const shops = await Shop.find({});
    res.render("shops/index", { shops });
});

app.get("/shops/new", (req, res) => {
    res.render("shops/new");
});

app.post("/shops", async (req, res) => {
    const newShop = new Shop(req.body);
    await newShop.save();
    res.redirect("/shops");
});

app.get("/shops/:id/products/new", async (req, res) => {
    const { id } = req.params;
    const shop = await Shop.findById(id);
    res.render("products/new", { categories, shop });
});

app.post("/shops/:id/products", async (req, res) => {
    const { id } = req.params;
    const shop = await Shop.findById(id);
    const product = new Product(req.body);
    shop.products.push(product);
    product.shop = shop;
    await shop.save();
    await product.save();
    res.redirect(`/shops/${id}`);
});

app.get("/shops/:id", async (req, res) => {
    const { id } = req.params;
    const shop = await Shop.findById(id).populate("products");
    res.render("shops/details", { shop });
});

app.delete("/shops/:id", async(req, res) => {
    await Shop.findByIdAndDelete(req.params.id);
    res.redirect("/shops");
});

//product routes
const categories = ["fruit","vegetable","dairy"];

app.get("/products", async (req, res) => {
    const { category } = req.query;
    let home = false;
    if( category ) {
        const products = await Product.find({ category });
        home = true;
        res.render("products/index", { products, home, category });
    }else{
        const products = await Product.find({});
        res.render("products/index", { products, home, category: "Product" });
    }; 
});

app.get("/products/new", (req, res) => {
    res.render("products/new",{ categories });
});

app.post("/products", async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
});

app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate("shop");
    res.render("products/details", { product });
});

app.get("/products/:id/edit", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/edit", { product, categories });
});

app.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true});
    res.redirect(`/products/${product._id}`);
});

app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect("/products");
});

app.listen(3000,() => {
    console.log("WORKING!!!");
});

