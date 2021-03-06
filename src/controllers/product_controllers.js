const { config } = require("../../config/environments/development")

const { QueryTypes } = require("sequelize")
const { mySqlSequelize } = require("../../config/database/mysql-db")
const { productQueries } = require("../../config/database/queries/productTable")

const listProducts = async (req, res) => {
    try {
        const result = await mySqlSequelize.query(productQueries.read, {
            type: QueryTypes.SELECT,
        })
        return res.status(200).json({ products: result.map((data) => data.name) })
    } catch (err) {
        return res.status(401).json({ messsage: err })
    }
}

const deleteProducts = async (req, res) => {
    const products = req.body.products
    try {
        products.forEach(async (element) => {
            await mySqlSequelize.query(productQueries.delete, {
                replacements: {
                    name: element,
                },
                type: QueryTypes.DELETE,
            })
        });
        return res.status(200).json({ messsage: "The products have been deleted" })
    } catch (err) {
        return res.status(401).json({ messsage: err })
    }
}

const addProducts = async (req, res) => {
    const products = req.body.products
    try {
        products.forEach(async (element) => {
            await mySqlSequelize.query(productQueries.create, {
                replacements: {
                    name: element.name,
                    img_url: element.img_url,
                    description: element.description,
                    price: element.price,
                },
                type: QueryTypes.INSERT,
            })
        })
        return res.status(200).json({ messsage: "products added succesfully" })
    } catch (err) {
        return res.status(401).json({ messsage: err })
    }
}

const updateProducts = async (req, res) => {
    const products = req.body.products
    try {
        products.forEach(async (element) => {
            await mySqlSequelize.query(productQueries.update, {
                replacements: {
                    id: element.id,
                    name: element.name,
                    img_url: element.img_url,
                    description: element.description,
                    price: element.price,
                },
                type: QueryTypes.UPDATE,
            })
        })
        return res.status(200).json({ messsage: "products updated succesfully" })
    } catch (err) {
        return res.status(401).json({ messsage: err })
    }
}

module.exports = {
    listProducts,
    deleteProducts,
    addProducts,
    updateProducts,
}
