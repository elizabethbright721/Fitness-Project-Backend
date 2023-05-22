const express = require("express");
const fitness = express.Router();
const {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../queries/fitness.js")

//INDEX
fitness.get("/", async (req, res) => {
    const allProducts = await getAllProducts();
    allProducts.sort((productA, prodcuctB) => productA.id - prodcuctB.id);
    res.status(200).json(allProducts);
})

//SHOW
fitness.get("/:id", async (req, res) => {
    const { id } = req.params;
    const product = await getOneProduct(id);
    if(!product.error){
        res.status(200).json(product);
    }else if (product.error.code === 0) {
        res.status(404).json("Product not found")
    } else {
        res.status(500).json({error: "server error"})
    }
})

//CREATE
fitness.post("/", async (req, res) => {
    const { rating, name, image, description, cost, category, benefit, benefit_two, benefit_three, is_popular } = req.body;
    const newProduct = await createProduct({
        rating,
        name, 
        image, 
        description, 
        cost, 
        category, 
        benefit, 
        benefit_two, 
        benefit_three, 
        is_popular
    });
    if(!newProduct.error) {
        res.status(201).json(newProduct);
    }else {
        res.status(500).json({error:"server error"})
    }
})

//UPDATE
fitness.put("/:id", async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    const updatedProduct = await updateProduct(id, product);
    if(!updatedProduct.error){
        res.status(201).json(updatedProduct)
    } else {
        res.status(500).json({error: "server error"})
    } 
})

//DELETE
fitness.delete("/:id", async (req, res) => {
    const {id} = req.params;
    const deletedProduct = await deleteProduct(id);
    if(deletedProduct.id) {
        res.status(201).json(deletedProduct)
    }else {
        res.status(404).json("User not found.")
    }
})

module.exports = fitness;