const orderQueries = {
  generateOrder: `INSERT INTO orders (id_user,description,price,payment_method)
    VALUES(:id_user,:description,:price,:payment_method)`,
  insertDataAux: `INSERT INTO products_by_orders (id_order,id_product,quantity)
    VALUES (:id_order,:id_product,:quantity)`,
  update: `UPDATE orders SET status =:status WHERE id = :id_order`,
  listMyOrders: `SELECT * FROM orders WHERE id_user = :id_user`,
  listAllOrders: `SELECT * FROM  orders`,
  deleteOrdersAux: "DELETE FROM products_by_orders WHERE id_order=:id_order",
  deleteOrders: "DELETE FROM orders WHERE id= :id_order",
};

module.exports = { orderQueries };
