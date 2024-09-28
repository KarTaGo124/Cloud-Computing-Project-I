db = db.getSiblingDB('database');

var ObjectId = require('mongodb').ObjectId;

// Insertar Categorías
db.categories.insertMany([
    { _id: ObjectId("66ecb5cd128f2fef1c964034"), name: "Electronics", description: "Devices and gadgets for everyday use" },
    { _id: ObjectId("66ecb5cd128f2fef1c964035"), name: "Games", description: "Video games and board games" },
    { _id: ObjectId("66ecb5cd128f2fef1c964036"), name: "Books", description: "Fictional and non-fictional literature" }
]);

// Insertar Productos
db.products.insertMany([
    { name: "Smartphone", description: "A powerful smartphone", price: 699.99, stock: 100, categoryId: ObjectId("66ecb5cd128f2fef1c964034") },
    { name: "Laptop", description: "A powerful laptop", price: 1200.99, stock: 50, categoryId: ObjectId("66ecb5cd128f2fef1c964034") },
    { name: "Tablet", description: "A powerful tablet", price: 499.99, stock: 80, categoryId: ObjectId("66ecb5cd128f2fef1c964034") },

    { name: "Chess", description: "Classic board game", price: 20.99, stock: 150, categoryId: ObjectId("66ecb5cd128f2fef1c964035") },
    { name: "Monopoly", description: "Famous board game", price: 25.99, stock: 120, categoryId: ObjectId("66ecb5cd128f2fef1c964035") },
    { name: "Video Game Console", description: "Next-gen console", price: 499.99, stock: 60, categoryId: ObjectId("66ecb5cd128f2fef1c964035") },

    { name: "Novel", description: "Best-seller novel", price: 12.99, stock: 200, categoryId: ObjectId("66ecb5cd128f2fef1c964036") },
    { name: "Cookbook", description: "Delicious recipes", price: 18.99, stock: 90, categoryId: ObjectId("66ecb5cd128f2fef1c964036") },
    { name: "Textbook", description: "Educational textbook", price: 55.99, stock: 70, categoryId: ObjectId("66ecb5cd128f2fef1c964036") }
]);
