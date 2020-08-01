const jwt = require("jsonwebtoken")
const { config } = require("../../config/environments/development")

const { QueryTypes } = require("sequelize")
const { mySqlSequelize } = require("../../config/database/mysql-db")
const { queryUsers } = require("../../config/database/queries/userTable")



const getUsers = async (req, res) => {
    try {
        const result = await mySqlSequelize.query(queryUsers.listUsers, {
            type: QueryTypes.SELECT,
        })
        return res
            .status(200).json({ users: result.map((data) => data.name) })
    } catch (err) {
        return res.status(401).json({ message: err })
    }
}

const createUser = async (req, res) => {
    const {
        name,
        username,
        password,
        email,
        phone,
        address,
        rol
    } = req.body

    try {
        await mySqlSequelize.query(queryUsers.createUsers, {
            replacements: {
                name: name,
                username: username,
                password: password,
                email: email,
                phone: phone,
                address: address,
                rol: rol,
            },
            type: QueryTypes.INSERT,
        })
        return res.status(200).json({ message: "New user created succesfully" });
    } catch (err) {
        return res.status(401).json({ message: "somethin happen sy" })
    }
}

const logUser = async (req, res) => {
    const { username, password } = req.body
    console.log(req.body);
    try {
        const data = await mySqlSequelize.query(queryUsers.login, {
            replacements: {
                username: username,
            },
            type: QueryTypes.SELECT,
        })
        console.log(data);
        if (password !== data[0].password) {
            res.status(401).json({ message: "invalid user or password try again" })
        }

        const user_rol = data[0].rol
        const user_id = data[0].id

        const payload = { user_id, username, password, user_rol }
        const jwtToken = jwt.sign(payload, config.JwtSecretKey, {
            expiresIn: config.JwtExpiresToken,
        })
        return res.status(200).json({ token: jwtToken })
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "something go wrong" })
    }


}

module.exports = {
    getUsers,
    createUser,
    logUser,
}