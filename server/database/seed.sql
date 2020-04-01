DROP DATABASE if exists pronto;
CREATE DATABASE pronto;

\c pronto

CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY INT,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    phone_number INT UNIQUE,
    email VARCHAR UNIQUE NOT NULL,
    address VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    state VARCHAR NOT NULL,
    zip_code INT NOT NULL,
    avatar_url VARCHAR NOT NULL,
    password HASH
);

CREATE TABLE store (
    store_id SERIAL PRIMARY KEY INT,
    store_name VARCHAR NOT NULL,
    avatar_url VARCHAR NOT NULL,
    phone_number INT UNIQUE,
    email VARCHAR UNIQUE NOT NULL,
    address VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    state VARCHAR NOT NULL,
    zip_code INT NOT NULL,
    password HASH
);

CREATE TABLE courier (
    courier_id SERIAL PRIMARY KEY INT,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    phone_number INT UNIQUE,
    email VARCHAR UNIQUE NOT NULL,
    avatar_url VARCHAR NOT NULL,
    password HASH
    mode_of_transportation VARCHAR NOT NULL
);

CREATE TABLE catergories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR NOT NULL,
);

CREATE TABLE materials (
    material_id SERIAL PRIMARY KEY,
    category_name VARCHAR NOT NULL,
);

CREATE TABLE brands (
    brand_id SERIAL PRIMARY KEY,
    brand_name VARCHAR NOT NULL,
    brand_description VARCHAR NOT NULL,
);


CREATE TABLE colors (
    color_id SERIAL PRIMARY KEY,
    color_name VARCHAR NOT NULL,
);


CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR NOT NULL,
    brand_id INT REFERENCES brands(brand_id),
    category_id INT REFERENCES catergories(category_id),
    product_price INT NOT NULL,
    material_id INT REFERENCES materials(material_id),
    color_id INT REFERENCES colors(color_id),
    product_size VARCHAR NOT NULL,
    product_description VARCHAR NOT NULL,
    product_type INT NOT NULL,
    quantity INT NOT NULL, 
);

CREATE TABLE productImage_id (
    product_image_id SERIAL PRIMARY KEY,
    product_id VARCHAR REFERENCES products(product_id)
    product_image_url VARCHAR,
);

