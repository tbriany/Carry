DROP DATABASE if exists carry;
CREATE DATABASE carry;

\c carry

CREATE TABLE customers(
    customer_id SERIAL PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    phone_number VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    address VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    state VARCHAR NOT NULL,
    zip_code INT NOT NULL,
    avatar_url VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);

CREATE TABLE stores(
    store_id SERIAL PRIMARY KEY,
    store_name VARCHAR NOT NULL,
    avatar_url VARCHAR NOT NULL,
    phone_number VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    address VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    state VARCHAR NOT NULL,
    zip_code INT NOT NULL,
    password VARCHAR NOT NULL
);

CREATE TABLE couriers(
    courier_id SERIAL PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    phone_number VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    avatar_url VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    mode_of_transportation VARCHAR NOT NULL
);

CREATE TABLE categories(
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR
);

CREATE TABLE product_type(
    product_type_id SERIAL PRIMARY KEY,
    category_id INT REFERENCES categories(category_id),
    product_type VARCHAR
);

CREATE TABLE materials(
    material_id SERIAL PRIMARY KEY,
    category_name VARCHAR 
);

CREATE TABLE brands(
    brand_id SERIAL PRIMARY KEY,
    brand_name VARCHAR,
    brand_description VARCHAR
);

CREATE TABLE colors(
    color_id SERIAL PRIMARY KEY,
    color_name VARCHAR NOT NULL
);

CREATE TABLE products(
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR,
    brand_id INT REFERENCES brands(brand_id),
    category_id INT REFERENCES categories(category_id),
    product_price INT,
    material_id INT REFERENCES materials(material_id),
    color_id INT REFERENCES colors(color_id),
    product_size VARCHAR,
    product_description VARCHAR,
    product_type INT,
    quantity INT
);

CREATE TABLE productImage_id(
    product_image_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id),
    product_image_url VARCHAR
);

-- Orders 

CREATE TABLE orders(
   order_id SERIAL PRIMARY KEY,
   order_status VARCHAR,
   required_date INT,
   time_ordered TIMESTAMP, 
   customer_id INT REFERENCES customers(customer_id),
   store_id INT REFERENCES stores(store_id),
   courier_id INT REFERENCES couriers(courier_id),
   delivery_fee INT,
   total INT
);

CREATE TABLE ordersItems(
    ordersItems_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    product_id INT REFERENCES products(product_id)
);

-- Payments

CREATE TABLE payment_type(
    payment_type_id SERIAL PRIMARY KEY,
    payment_type_name VARCHAR
);

CREATE TABLE payment(
    payment_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    payment_type_id INT REFERENCES payment_type(payment_type_id),
    card_number INT,
    exp_date INT, 
    cvv INT
);

CREATE TABLE bankInfo(
    bankInfo_id SERIAL PRIMARY KEY,
    courier_id INT REFERENCES couriers(courier_id),
    account_number INT,
    routing_number INT
);

SELECT * FROM customers;
SELECT * FROM stores;
SELECT * FROM couriers;
SELECT * FROM categories;
SELECT * FROM product_type;
SELECT * FROM materials;
SELECT * FROM brands;
SELECT * FROM colors;
SELECT * FROM products;
SELECT * FROM productImage_id;
SELECT * FROM orders;
SELECT * FROM ordersItems;
SELECT * FROM payment_type;
SELECT * FROM payment;
SELECT * FROM bankInfo;

INSERT INTO customers
(firstname, lastname, phone_number, email, address, city, state, zip_code, avatar_url, password)
VALUES ('Ana', 'Gomez', '(347)-555-5551', 'Ana@pursuit.org', '47-10 Austell Pl 2nd floor', 'Long Island City', 'NY', 11101, 'img' , 'ana'); 

INSERT INTO stores
(store_name, avatar_url, phone_number,email, address, city, state, zip_code, password)
VALUES 
('PazLifestyle', 'img', '(347)-555-5552', 'info@pazlifestyle.com', 'address', 'city', 'state', 00000, 'lifestyle');

INSERT INTO couriers
(firstname, lastname,phone_number, email, avatar_url, password, mode_of_transportation)
VALUES ('Jacob', 'Smith', '(347)-555-5553', 'Smith@courier.com', 'img', 'jacobsmith', 'bike');

INSERT INTO categories 
(category_name)
VALUES 
('Women''s Clothing'), 
('Men''s Clohing'), 
('Beauty'), 
('Accessories');

INSERT INTO product_type
(category_id, product_type)
VALUES 
(1, 'Tops'),
(1, 'Pants'),
(1, 'Dresses'),
(1, 'Jackets & Coats'),
(1, 'Skirts'),
(1, 'Shorts'),
(1, 'Shirts & Blouses'),
(1, 'Jeans'),
(1, 'Swimwear'),
(1, 'Hoodies & Sweatshirts'),
(1, 'Sportswear'),
(2, 'Tops'),
(2, 'Pants'),
(2, 'Jackets & Coats'),
(2, 'Shorts'),
(2, 'Shirts & Blouses'),
(2, 'Jeans'),
(2, 'Swimwear'),
(2, 'Hoodies & Sweatshirts'),
(2, 'Sportswear'),
(3, 'Face'),
(3, 'Eyes'),
(3, 'Lips'),
(3, 'Nails'),
(3, 'Bath & Body Care'),
(3, 'Hair'),
(3, 'Brushes & Tools'),
(4, 'Bags'),
(4, 'Belts'),
(4, 'Jewelry'),
(4, 'Hair Accessories'),
(4, 'Sunglasses'),
(4, 'Gloves'),
(4, 'Scarves'),
(4, 'Hats & Caps'),
(4, 'Wallets & Coin purses');

INSERT INTO materials
(material_name)
VALUES 
('Organic Cotton'),
('Organic Linen'),
('Hemp'),
('Suede'),
('Leather'),
('Polyester');

INSERT INTO brands
(brand_name, brand_description)
VALUES 
('Lima Sagrada', 'Lima Sagrada is the name of a project that gives shape to raw materials such as leather in its most basic pure form, resulting in a modern and contemporary design founded by Vanessa Vila. Vanessa Vila is an architect, art director, and a stylist in Lima, Peru.');

INSERT INTO colors
(color_name)
VALUES 
('Black'),
('White'),
('Green'),
('Red'),
('Yellow'),
('Purple'),
('Pink'),
('Gray'),
('Brown'),
('Orange'),
('Blue'),
('Pink');
