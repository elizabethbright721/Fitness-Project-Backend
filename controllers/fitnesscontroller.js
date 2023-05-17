const express = require("express");
const fitness = express.Router();
const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
} = require("../queries/fitness.js")

//INDEX
fitness.get("/", async (req, res) => {
    const allUsers = await getAllUsers();
    res.status(200).json(allUsers);
})

//SHOW
fitness.get("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await getOneUser(id);
    if(!user.error){
        res.status(200).json(user);
    }else if (user.error.code === 0) {
        res.status(404).json("user not found")
    } else {
        res.status(500).json({error: "server error"})
    }
})

//CREATE
fitness.post("/", async (req, res) => {
    const { name, image, age, fit_category, start_weight, goal_weight, present_weight } = req.body;
    const newUser = await createUser({
        name,  
        image,
        age, 
        fit_category,  
        start_weight, 
        goal_weight, 
        present_weight
    });
    if(!newUser.error) {
        res.status(201).json(newUser);
    }else {
        res.status(500).json({error:"server error"})
    }
})

//UPDATE
fitness.put("/:id", async (req, res) => {
    const { id } = req.params;
    const user = req.body;
    const updatedUser = await updateUser(id, user);
    if(!updatedUser.error){
        res.status(201).json(updatedUser)
    } else {
        res.status(500).json({error: "server error"})
    } 
})

//DELETE
fitness.delete("/:id", async (req, res) => {
    const {id} = req.params;
    const deletedUser = await deleteUser(id);
    if(deletedUser.id) {
        res.status(201).json(deletedUser)
    }else {
        res.status(404).json("User not found.")
    }
})

module.exports = fitness;