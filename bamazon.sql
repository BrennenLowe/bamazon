DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id integer(5) NOT NULL,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR (100) NULL,
    price DECIMAL (10,2) NULL,
    stock_quantity INTEGER (10000) NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;
