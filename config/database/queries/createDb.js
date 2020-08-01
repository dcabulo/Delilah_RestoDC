const { MysqlConfig } = require("../../environments/development").config;

const queryCheckDb=async()=>{
    return `SELECT SCHEMA.NAME
    FROM INFORMATION_SCHEMA.SCHEMATA
    WHERE SCHEMA_NAME='${MysqlConfig.Db}';`
}



const querySetDb = () => {
    return `CREATE SCHEMA IF NOT EXISTS ${MysqlConfig.Db};
    USE ${MysqlConfig.Db};`
}

const queryCreateUserTable = () => {
    return `CREATE TABLE IF NOT EXISTS users(
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(60) NOT NULL, 
        username VARCHAR(60) NOT NULL,
        password VARCHAR(60) NOT NULL,
        email VARCHAR(60) NOT NULL,
        phone VARCHAR(60) NOT NULL,
        address VARCHAR(60) NOT NULL,
        rol VARCHAR(60) NOT NULL,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`
}

const queryCreateProductTable = () => {
    return `CREATE TABLE IF NOT EXISTS products(
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(60) NOT NULL, 
        img_url VARCHAR(120) NOT NULL,
        description VARCHAR(60) NOT NULL,
        price INT NOT NULL, 
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`
}

const queryCreateOrdersTable = () => {
    return `CREATE TABLE IF NOT EXISTS orders(
        id INT PRIMARY KEY AUTO_INCREMENT,
        id_user INT NOT NULL,
        description VARCHAR(120) NOT NULL,
        price INT NOT NULL, 
        payment_method ENUM('cash','card') NOT NULL,
        status ENUM('new','confirmed','cooking','finish','delievered') DEFAULT 'new' NOT NULL,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`
}

const queryCreateProductByOrder = () => {
    return `CREATE TABLE if	 NOT EXISTS products_by_orders(
        id_order INT NOT NULL, 
        id_product INT NOT NULL, 
        quantity INT DEFAULT 1
        );`
}

const queryForeignKey = (name, aliasFK, foreingkey, reference) => {
    return `ALTER TABLE ${name}
    ADD CONSTRAINT ${aliasFK}
    FOREIGN KEY (${foreingkey}) REFERENCES ${reference};`
}

module.exports = {
    queryCheckDb,
    querySetDb,
    queryCreateUserTable,
    queryCreateProductTable,
    queryCreateOrdersTable,
    queryCreateProductByOrder,
    queryForeignKey,
};
