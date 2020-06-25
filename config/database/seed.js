const { MysqlConfig } = require("../environments/development").config;
const queryDb = require("../database/queries/createDb");
const { sequelize } = require("sequelize");

const mySqlSequelize = new Sequelize(
    "",
    MysqlConfig.User,
    MysqlConfig.Password, {
    host: MysqlConfig.Host,
    dialect: MysqlConfig.Dialect,
}
)

const setDb = async () => {
    try {
        await mySqlSequelize.query(queryDb.querySetDb())
    } catch (err) {
        console.log(err);
    }
}

const createUserTable = async () => {
    try {
        await mySqlSequelize.query(queryDb.queryCreateUserTable())
    } catch (err) {
        console.log(err);
    }
}

const createProductTable = async () => {
    try {
        await mySqlSequelize.query(queryDb.queryCreateProductTable())
    } catch (err) {
        console.log(err);
    }
}

const createOrderTable = async () => {
    try {
        await mySqlSequelize.query(queryDb.queryCreateOrdersTable())
    } catch (err) {
        console.log(err);
    }
}

const createProductByOrder = async () => {
    try {
        await mySqlSequelize.query(queryDb.queryCreateProductByOrdere())
    } catch (err) {
        console.log(err);
    }
}

const addForeingKeyOrders = async () => {
    try {
        await mySqlSequelize.query(queryDb.queryForeignKey('orders', 'FK_ORDER_USER', 'id_user', 'users(id)'))
    } catch (err) {
        console.log(err);
    }
}

const addForeingKeyProducstByOrders = async () => {
    try {
        await mySqlSequelize.query(queryDb.queryForeignKey('products_by_orders', 'FK_PRODUCTBY_ORDER', 'id_order', 'orders(id)'))
    } catch (err) {
        console.log(err);
    }
}

const addForeingKeyProducstByProducts = async () => {
    try {
        await mySqlSequelize.query(queryDb.queryForeignKey('products_by_orders', 'FK_PRODUCTBY_PRODUCTS', 'id_product', 'products(id)'))
    } catch (err) {
        console.log(err);
    }
}
