const ENV = process.env.NODE_ENV || "development.js";
const { MysqlConfig } = require("../environments/" + ENV).config;

const { Sequelize,QueryTypes }= require("sequelize");

const mySqlSequelize = new Sequelize(
    MysqlConfig.Db,
    MysqlConfig.User,
    MysqlConfig.Password,{
        host: MysqlConfig.Host,
        dialect: MysqlConfig.Dialect,
    }
)