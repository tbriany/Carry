DROP DATABASE if exists rush;
CREATE DATABASE rush;

\c rush

CREATE TABLE customer(
    customer_id SERIAL PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    phone_number INT UNIQUE,
    email VARCHAR UNIQUE NOT NULL,
    address VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    state VARCHAR NOT NULL,
    zip_code INT NOT NULL,
    avatar_url VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);

CREATE TABLE store(
    store_id SERIAL PRIMARY KEY,
    store_name VARCHAR NOT NULL,
    avatar_url VARCHAR NOT NULL,
    phone_number INT UNIQUE,
    email VARCHAR UNIQUE NOT NULL,
    address VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    state VARCHAR NOT NULL,
    zip_code INT NOT NULL,
    password VARCHAR NOT NULL
);

CREATE TABLE courier(
    courier_id SERIAL PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    phone_number INT UNIQUE,
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


-- ORDERS 

CREATE TABLE orders(
   order_id SERIAL PRIMARY KEY,
   order_status VARCHAR,
   required_date INT,
   time_ordered TIMESTAMP, 
   customer_id INT REFERENCES customer(customer_id),
   store_id INT REFERENCES store(store_id),
   courier_id INT REFERENCES courier(courier_id),
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
    customer_id INT REFERENCES customer(customer_id),
    payment_type_id INT REFERENCES payment_type(payment_type_id),
    card_number INT,
    exp_date INT, 
    cvv INT
);



CREATE TABLE bankInfo(
    courier_id INT REFERENCES courier(courier_id),
    account_number INT,
    routing_number INT
);


SELECT * FROM customer;
SELECT * FROM store;
SELECT * FROM courier;
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