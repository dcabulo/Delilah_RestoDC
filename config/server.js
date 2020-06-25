const ENV = process.env.NODE_ENV || "development.js";
const config = require("./environments/" + ENV).config
//const dataBase=require("./database/mysql-db")
//jnlanda

const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app= express();
app.use(bodyParser.json());

app.listen(config.Port,()=>{
    console.log(`Servidor iniciado en el puerto ${config.Port}`);
    
})