CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER (4) NOT NULL,
product_name VARCHAR (50) NULL,
department_name VARCHAR (50) NULL,
price DECIMAL (10,2) NOT NULL,
stock_quantity INTEGER (10) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (0243, "Basketball", "Sports & Outdoors", 25.45, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8459, "Headphones", "Electronics", 52.60, 300);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1932, "Clue", "Games", 9.99, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (0487, "Fishing Rod", "Sports & Outdoors", 49.99, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1346, "Paper Towel Holder", "Home & Kitchen", 21.50, 400);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2109, "Super Soaker", "Games", 19.99, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (0164, "Harry Potter and the Chamber of Secrets", "Movies & TV", 15.99, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2051, "Makeup Sponge", "Health & Beauty", 12.99, 400);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5178, "Decorative Pillow", "Home Decor", 10.99, 300);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6340, "Huggies Diapers", "Kids & Baby", 49.99, 800);

SELECT * FROM products;

