const db = require("../db/dbConfig.js");

const getAllUsers = async () => {
    try {
        const allUsers = await db.any("SELECT * FROM users");
        return allUsers;
    } catch(error) {
        return {error: error}
    }
}

const getOneUser = async (id) => {
    try {
        const user = await db.one(`SELECT * FROM users WHERE id=${id}`)
        return user;
    }catch (error) {
        return {error: error};
    }
}

const createUser = async (user) => {
    try{ 
        const newUser = await db.one(
            `INSERT INTO
            users(name, image, age, fit_category, start_weight, goal_weight, present_weight)
            VALUES
            ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;`,
            [user.name, user.image, user.age, user.fit_category, user.start_weight, user.goal_weight, user.present_weight]
        );
        return newUser;
    }catch(error) {
        return {error: error};
    }
}

const updateUser = async (id, user) => {
    try{
        const updatedUser = await db.one(
            `UPDATE users SET name=$1, image=$2, age=$3, fit_category=$4, start_weight=$5, goal_weight=$6, present_weight=$7 WHERE id=$8 RETURNING * `,
            [user.name, user.image, user.age, user.fit_category, user.start_weight, user.goal_weight, user.present_weight, id]
        );
        return updatedUser;
    }catch (error){
        return { error: error };
    }
}

const deleteUser = async (id) => {
    try {
        const deletedUser = await db.one(
            "DELETE FROM users WHERE id=$1 RETURNING *",
            id
        );
        return deletedUser;
    } catch(error){
        return error; 
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser

}