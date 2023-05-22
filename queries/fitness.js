const db = require("../db/dbConfig.js");

const getAllProducts = async () => {
    try {
        const allProducts = await db.any("SELECT * FROM products");
        return allProducts;
    } catch(error) {
        return {error: error}
    }
}

const getOneProduct = async (id) => {
    try {
        const product = await db.one(`SELECT * FROM products WHERE id=${id}`)
        return product;
    }catch (error) {
        return {error: error};
    }
}

const createProduct = async (product) => {
    try{ 
        const newProduct = await db.one(
            `INSERT INTO
            products(rating, name, image, description, cost, category, benefit, benefit_two, benefit_three, is_popular)
            VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *;`,
            [product.rating, product.name, product.image, product.description, product.cost, product.category, product.benefit, product.benefit_two, product.benefit_three, product.is_popular]
        );
        return newProduct;
    }catch(error) {
        return {error: error};
    }
}

const updateProduct = async (id, product) => {
    try{
        const updatedProduct = await db.one(
            `UPDATE products SET rating =$1, name=$2, image=$3, description=$4, cost=$5, category=$6, benefit=$7, benefit_two=$8, benefit_three=$9, is_popular=$10 WHERE id=$11 RETURNING * `,
            [product.rating, product.name, product.image, product.description, product.cost, product.category, product.benefit, product.benefit_two, product.benefit_three, product.is_popular, id]
        );
        return updatedProduct;
    }catch (error){
        return { error: error };
    }
}

const deleteProduct = async (id) => {
    try {
        const deletedProduct = await db.one(
            "DELETE FROM products WHERE id=$1 RETURNING *",
            id
        );
        return deletedProduct;
    } catch(error){
        return error; 
    }
}

module.exports = {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct

}