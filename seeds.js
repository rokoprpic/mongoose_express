const mongoose = require('mongoose');
const Product = require("./models/product");

mongoose.connect('mongodb://127.0.0.1:27017/farm')
.then(() => {
    console.log("Connection sucess!!!")
})
.catch(err => {
    console.log(err);
});

/* const p = new Product({
    name: 'Apple',
    price: 1.2,
    category: "fruit"
});

p.save().then(p => {
    console.log(p);
})
.catch(e => {
    console.log(e);
}); */

const seedProducts = [
    {
        name: "Apple",
        price: 1.99,
        category: "Fruit"
    },
    {
        name: "Tomato",
        price: 0.99,
        category: "Vegetable"
    },
    {
        name: "Milk",
        price: 2.49,
        category: "Dairy"
    },
    {
        name: "Banana",
        price: 0.79,
        category: "Fruit"
    },
    {
        name: "Carrot",
        price: 0.69,
        category: "Vegetable"
    },
    {
        name: "Cheese",
        price: 3.99,
        category: "Dairy"
    },
    {
        name: "Orange",
        price: 1.49,
        category: "Fruit"
    },
    {
        name: "Spinach",
        price: 1.29,
        category: "Vegetable"
    },
    {
        name: "Yogurt",
        price: 1.99,
        category: "Dairy"
    },
    {
        name: "Pear",
        price: 1.79,
        category: "Fruit"
    }
];

Product.insertMany(seedProducts)
.then(res => {
    console.log(res);
})
.catch(e => {
    console.log(e);
});