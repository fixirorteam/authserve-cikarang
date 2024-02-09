const Users = require("../models/UserModels")
const argon2 = require("argon2")

const getUsers = async(req,res) => {
    try {
        const response = await Users.findAll({
            attributes: ['uuid', 'name', 'email']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

const getUsersById = async(req,res) => {
    try {
        const response = await Users.findOne({
            attributes: ['uuid', 'name', 'email'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

const createUsers = async(req , res) => {
    const {name, email, password, confPassword, role} = req.body;
    if(password !== confPassword) {
        return res.status(400).json({
            msg: "Password tidak sama"
        })
    }
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({
            msg: "Register Berhasil"
        })
    } catch (error) {
        res.status(400).json({
            msg: error.message
        });
    }
}

const updateUsers = async(req,res) => {
    const users = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!users){
        return res.status(404).json({
            msg: "User tidak ditemukan"
        })
    }
    const {name, email, password, confPassword, role} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = users.password
    }else{
        hashPassword = await argon2.hash(password);

    }
    if(password !== confPassword) {
        return res.status(400).json({
            msg: "Password tidak sama"
        })
    }

    try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        },{
            where: {
                id: users.id
            }
        });
        res.status(200).json({
            msg: "Update Berhasil"
        })
    } catch (error) {
        res.status(400).json({
            msg: error.message
        });
    }
}

const deleteUsers = async(req,res) => {
    const users = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!users){
        return res.status(404).json({
            msg: "User tidak ditemukan"
        })
    }

    try {
        await Users.destroy({
                where: {
                    id: users.id
                }
        });
        res.status(200).json({
            msg: "Delete Berhasil"
        })
    } catch (error) {
        res.status(400).json({
            msg: error.message
        });
    }
}

module.exports = {
    getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers
}