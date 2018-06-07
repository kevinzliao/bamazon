create database bamazon;

use bamazon;

create table products (item_id int not null primary key auto_increment,
product_name varchar(50),
department_name varchar(50),
price int,
stock_quantity int);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('ipad', 'electronics', 400, 10),
('iphone', 'electronics', 300, 10),
('basketball', 'sports', 40, 30),
('football', 'sports', 40, 30),
('fishing rod', 'sports', 20, 10),
('laptop', 'electronics', 500, 5),
('dog food', 'pets', 5, 100),
('cat food', 'pets', 5, 100),
('desktop', 'electronics', 400, 2),
('zune', 'electronics', 20, 500)