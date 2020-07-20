const productQueries = {
    create: "INSERT INTO products (name,img_url,description,price) VALUES (:name,:img_url,:description,:price)",
    read: "SELECT name FROM products",
    update: `UPDATE products
    SET name = :name, img_ul = :img_url,description = :description, price = :price
    WHERE id = :id`,
    delete: "DELETE FROM products WHERE name = :name"
}

module.exports={
    productQueries
}