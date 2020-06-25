CREATE SCHEMA IF NOT EXISTS delilah_resto_DC;
USE delilah_resto_DC;

CREATE TABLE IF NOT EXISTS users(
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
);

CREATE TABLE IF NOT EXISTS products(
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(60) NOT NULL, 
img_url VARCHAR(120) NOT NULL,
description VARCHAR(60) NOT NULL,
price INT NOT NULL, 
create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
update_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders(
id INT PRIMARY KEY AUTO_INCREMENT,
id_user INT NOT NULL,
price INT NOT NULL, 
payment_method ENUM('cash','card') NOT NULL,
status ENUM('new','confirmed','cooking','finish','delievered') DEFAULT 'new' NOT NULL,
create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
update_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE if	 NOT EXISTS products_by_orders(
id_order INT NOT NULL, 
id_product INT NOT NULL, 
quantity INT DEFAULT 1
);

ALTER TABLE orders
ADD CONSTRAINT FK_ORDER_USER
FOREIGN KEY (id_user) REFERENCES users(id);

ALTER TABLE products_by_orders
ADD CONSTRAINT FK_PRODUCTBY_ORDER
FOREIGN KEY (id_order) REFERENCES orders(id);

ALTER TABLE products_by_orders
ADD CONSTRAINT FK_PRODUCTBY_PRODUCTS
FOREIGN KEY (id_product) REFERENCES products(id);

-- USER QUERIES

-- get users
SELECT * FROM users;

-- crear usuarios
INSERT INTO users (name,username,password,email,phone,address,rol)
	VALUES('name','username','password','email','phone','address','rol'); 
SELECT LAST_INSERT_ID(); 
    
    
-- log user
SELECT username, admin, password, id
FROM users
WHERE username='username' OR email='email' and password='password';

-- PRODUCTS QUERIES

-- get products
SELECT * FROM products;

-- crear usuario
INSERT INTO products (name, img_url, description, price)
	VALUES ('perro', 'dasdad', 'perroCaliente', price);
    
-- actualizar info usuario
UPDATE products
SET name='name', img_url='url', description='description', price='price'
WHERE id ='product_id';

-- eliminar producto
DELETE FROM products
WHERE id ='products_id';

-- ORDERS QUERIES

-- get unique orders

SELECT O.id AS order_id, U.id AS user_id, O.payment_method, U.address, O.status, PD.*,SUM(P.quantity) As quantity, SUM(P.quantity * PD.price) AS total_price
FROM products_by_orders P
JOIN orders O ON P.id_order= O.id
JOIN products PD ON P.id_product =PD.id
JOIN users U ON O.id_user= U.id
WHERE U.username ='username'
GROUP BY O.id, PD.name;

-- get all orders

SELECT O.id AS order_id, U.id AS user_id, O.payment_method, U.address, O.status, PD.*,SUM(P.quantity) As quantity, SUM(P.quproductsproductsproductsantity * PD.price) AS total_price
FROM products_by_orders P
JOIN orders O ON P.id_order= O.id
JOIN products PD ON P.id_product =PD.id
JOIN users U ON O.id_user= U.id
GROUP BY O.id, PD.name;
SELECT COUNT(*) FROM products_by_orders;

-- create orders
INSERT INTO  orders(id_user, price, payment_method)
	VALUES(1,12000,'card');

INSERT INTO products_by_orders(id_order, id_product, quantity)
	VALUES('id_order','id_product','quantity');

-- update order

UPDATE orders 
SET status='status'
WHERE id ='order_id';


















