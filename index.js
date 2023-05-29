const express =  require("express");
const app =  express();
const path = require("path");
const mongoose = require('mongoose');
const Product = require("./models/product");
const methodOveride = require("method-override");

mongoose.connect('mongodb://127.0.0.1:27017/farm')
.then(() => {
    console.log("Connection sucess!!!")
})
.catch(err => {
    console.log(err);
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));
app.use(methodOveride("_method"));

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
    const product = await Product.findById(id);
    res.render("products/details", { product });
});

app.get("/products/:id/edit", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/edit", { product, categories });
});

app.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runvVlidators: true});
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

