const config = require("./environments/development").config;
const authMidd = require("../config/middlewares/auto_middle");

const express = require("express");
const bodyParser = require("body-parser");

const userControl = require("../src/controllers/user_controllers");
const productControl = require("../src/controllers/product_controllers");
const ordersControl = require("../src/controllers/orders_controllers");

const app = express();
app.use(bodyParser.json());

app.get(config.ApiBaseUrl + "health", (req, res) => {
  return res.status(200).json({ status: "Ok" });
});

//user routes

app.get(
  config.ApiBaseUrl + "user/listusers",
  authMidd.validateJWt,
  authMidd.validateAdmin,
  userControl.getUsers
);

app.post(config.ApiBaseUrl + "user/newuser", userControl.createUser);

app.post(config.ApiBaseUrl + "user/login", userControl.logUser);

//products routes

app.post(
  config.ApiBaseUrl + "product/newproduct",
  authMidd.validateJWt,
  authMidd.validateAdmin,
  productControl.addProducts
);

app.get(
  config.ApiBaseUrl + "product/listproducts",
  authMidd.validateJWt,
  productControl.listProducts
);

app.put(
  config.ApiBaseUrl + "product/updateproduct",
  authMidd.validateJWt,
  authMidd.validateAdmin,
  productControl.updateProducts
);

app.delete(
  config.ApiBaseUrl + "product/removeproduct",
  authMidd.validateJWt,
  authMidd.validateAdmin,
  productControl.deleteProducts
);

//order routes

app.post(
  config.ApiBaseUrl + "order/newOrder",
  authMidd.validateJWt,
  ordersControl.generateOrder
);

app.patch(
  config.ApiBaseUrl + "order/updateOrder",
  authMidd.validateJWt,
  authMidd.validateAdmin,
  ordersControl.upadateOrder
);

app.delete(
  config.ApiBaseUrl + "order/deleteorder",
  authMidd.validateJWt,
  authMidd.validateAdmin,
  ordersControl.deleteOrders
);

app.get(
  config.ApiBaseUrl + "order/myOrders",
  authMidd.validateJWt,
  ordersControl.listOrders
);

app.get(
  config.ApiBaseUrl + "order/allOrders",
  authMidd.validateJWt,
  authMidd.validateAdmin,
  ordersControl.ListAllOrders
);

app.listen(config.Port, () => {
  console.log(`Servidor iniciado en el puerto ${config.Port}`);
});
