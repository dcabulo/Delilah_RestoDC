const { QueryTypes, json } = require("sequelize");
const { mySqlSequelize } = require("../../config/database/mysql-db");
const { orderQueries } = require("../../config/database/queries/orderTable");

const formatDescription = (arrayData) => {
  let formatOrder = "";

  arrayData.forEach((element) => {
    formatOrder = element.quantity + "x" + element.product + " " + formatOrder;
  });
  formatOrder = formatOrder.trim();
  console.log(arrayData);
  return formatOrder;
};

const formatPrice = (arrayData) => {
  let totalPrice = 0;
  arrayData.forEach((element) => {
    totalPrice =
      totalPrice + parseInt(element.price) * parseInt(element.quantity);
  });
  return totalPrice;
};

const generateOrder = async (req, res) => {
  const { payment_method } = req.body;
  const id_user = res.decoded.user_id;
  const orderDescription = req.body.description;
  const orderFormat = formatDescription(orderDescription);
  const orderPrice = formatPrice(orderDescription);

  let infoResp;

  try {
    infoResp = await mySqlSequelize.query(orderQueries.generateOrder, {
      replacements: {
        id_user: id_user,
        description: orderFormat,
        price: orderPrice,
        payment_method: payment_method,
      },
      type: QueryTypes.INSERT,
    });
  } catch (err) {
    return res.status(401).json({ message: err });
  }

  const id_order = infoResp[0];
  try {
    orderDescription.forEach(async (element) => {
      await mySqlSequelize.query(orderQueries.insertDataAux, {
        replacements: {
          id_order: id_order,
          id_product: element.product_id,
          quantity: element.quantity,
        },
        type: QueryTypes.INSERT,
      });
    });
  } catch (err) {
    return res.status(401).json({ message: err });
  }
  return res.status(200).json({ message: "order generated successfully" });
};

const upadateOrder = async (req, res) => {
  const { id_order, status } = req.body;
  try {
    await mySqlSequelize.query(orderQueries.update, {
      replacements: {
        id_order: id_order,
        status: status,
      },
      type: QueryTypes.UPDATE,
    });
    return res.status(200).json({ message: "Order Updated Successfully" });
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

const listOrders = async (req, res) => {
  const id_user = res.decoded.user_id;
  try {
    const data = await mySqlSequelize.query(orderQueries.listMyOrders, {
      replacements: {
        id_user: id_user,
      },
      type: QueryTypes.SELECT,
    });
    return res.status(200).json({ orders: data });
  } catch (err) {
    return res.status(401).json({ message: "No orders, try to make one" });
  }
};

const ListAllOrders = async (req, res) => {
  try {
    const data = await mySqlSequelize.query(orderQueries.listAllOrders, {
      type: QueryTypes.SELECT,
    });
    return res.status(200).json({ orders: data });
  } catch (err) {
    return res.status(401).json({ message: "unauthorized or no orders" });
  }
};

const deleteOrders = async (req, res) => {
  const { id_order } = req.body;
  try {
    await mySqlSequelize.query(orderQueries.deleteOrdersAux, {
      replacements: {
        id_order: id_order,
      },
      type: QueryTypes.DELETE,
    });
  } catch (err) {
    return res.status(401).json({ message: "something happen try later" });
  }
  try {
    await mySqlSequelize.query(orderQueries.deleteOrders, {
      replacements: {
        id_order: id_order,
      },
      type: QueryTypes.DELETE,
    });
    return res.status(200).json({ message: "Order Deleted" });
  } catch (err) {
    return res.status(401).json({ message: "something happen try later" });
  }
};

module.exports = {
  generateOrder,
  upadateOrder,
  listOrders,
  ListAllOrders,
  deleteOrders,
};
