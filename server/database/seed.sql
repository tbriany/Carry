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
    password VARCHAR NOT NULL, 
    lat FLOAT, 
    lng FLOAT
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
    product_type_name VARCHAR
);

CREATE TABLE materials(
    material_id SERIAL PRIMARY KEY,
    material_name VARCHAR
);

CREATE TABLE brands(
    brand_id SERIAL PRIMARY KEY,
    brand_name VARCHAR,
    brand_description VARCHAR,
    store_id INT REFERENCES stores(store_id)
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
    product_type INT REFERENCES product_type(product_type_id),
    quantity INT
);

CREATE TABLE productImage_id(
    product_image_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id),
    product_image_url VARCHAR,
    category_id INT REFERENCES categories(category_id)
);


--Checkout Cart
CREATE TABLE checkoutCart(
    checkoutCart_id SERIAL PRIMARY KEY,
    product_id  INT REFERENCES products(product_id),
    size VARCHAR,
    quantity INT,
    totalPrice INT

);


-- Orders 

CREATE TABLE orders(
   order_id SERIAL PRIMARY KEY,
   order_status VARCHAR,
   required_date DATE,
   time_ordered TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
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

INSERT INTO customers
(firstname, lastname, phone_number, email, address, city, state, zip_code, avatar_url, password)
VALUES ('Ana', 'Gomez', '(347)-555-5551', 'Ana@pursuit.org', '47-10 Austell Pl 2nd floor', 'Long Island City', 'NY', 11101, 'img' , 'ana'); 

INSERT INTO stores
(store_name, avatar_url, phone_number, email, address, city, state, zip_code, password, lat, lng)
VALUES 
('PazLifestyle', 'https://cdn.shopify.com/s/files/1/0082/3558/1504/files/pazlogo3_x45@2x.png', '(347)-555-5552', 'info@pazlifestyle.com', 'address', 'city', 'state', 00000, 'lifestyle', 40.312321, -73.12112),

('Louis Vuitton', 'https://i.pinimg.com/originals/ce/6d/3e/ce6d3ed43b69df168ca4ce8a5e602759.jpg', '(212)758-8877)', 'cannotfindemail@gmail.com', '1 East 57 St', 'New York', 'NY', 10022, 'Vuitton', 40.760350, -73.975080),

('Prada', 'https://cdn.shopify.com/s/files/1/0049/8489/7625/products/Prada_580x.jpg', '(212)-327-4200', 'client.service.americas@prada.com','841 Madison Avenue', 'New York', 'NY',10021, 'Prada1', 40.770260,
-73.966320),

('Chanel', 'https://www.agneseangelini.com/wp-content/uploads/2019/04/coco.jpg', '(212)355-5050', 'email@gmail.com','15 East 57th Street','New York', 'NY', 10022,'Chanel1', 40.762730, -73.972730),

('Tiffany & Co.', 'https://i.pinimg.com/originals/72/c5/69/72c56940aa7b09daf1c51855d8d062ec.jpg', '(212)755-8000', 'noemail@gmail.org','6 East 57th St', 'New York', 'NY', 10022, 'Tiffany1', 40.762810, -73.973710), 

('Giorgio Armani New York', 'https://cdn11.bigcommerce.com/s-sq9zkarfah/images/stencil/1280x1280/products/102879/127279/Giorgio-Armani-Logo-Decal-Sticker__10076.1510657355.jpg', '(212)988-9191', 'email2@gmail.com', '760 Madison Avenue', 'New York', 'NY', 10021, 'Giorgio1', 40.772460, -73.964930),

('Hermès Men', 'https://cdn11.bigcommerce.com/s-sq9zkarfah/images/stencil/1280x1280/products/102859/136658/Hermes-Logo-Decal-Sticker__53440.1510913981.jpg', '(212)751-3181', 'email4@gmail.com', '690 Madisoon Avenue', 'New York', 'NY', 10065, 'Hermes1',40.8307354 ,-73.9701922),

 ('Dior', 'https://s3images.coroflot.com/user_files/individual_files/723615_dhooks0vasdxe8nc74sr8nz96.jpg', '(212)931-2950', 'email5@gmail.com','21 East 57th St', 'New York', 'NY', 10022, 'Dior1',40.7626074,-73.9726671 ), 

 ('Versace', 'https://cdn11.bigcommerce.com/s-sq9zkarfah/images/stencil/1280x1280/products/102679/136824/Versace-Logo-Decal-Sticker__06770.1510914073.jpg','(212)317-0224', 'email6@gmail.com', '647 5th Avenue', 'New York', 'NY', 10022, 'Versace1', 40.7594999, -73.9762444), 

 ('Fendi', 'https://ih1.redbubble.net/image.1000144398.0490/farp,small,wall_texture,product,750x1000.jpg', '(212)897-2244', 'email7@gmail.com', '598 Madisoon Avenue', 'New York', 'NY', 10022, 'fendi1', 40.7626106,-73.9723989), 

 ('Sephora', 'https://i.pinimg.com/originals/24/a5/3f/24a53fedd242af9594f1c0e80ae9b647.png', '(212)278-0037', 'email8@gmail.com', '580 5th Avenue', 'New York', 'NY', 10036, 'Sephora1', 40.7570994, -73.9791521), 

 ('Coach', 'https://i.pinimg.com/originals/9a/8a/67/9a8a676b151cf64e56161be07a2aca4f.png', '(212)599-4777', 'email9@gmail.com', '342 Madison Avenue', 'New York', 'NY', 10173, 'Coach1', 40.7541208, 73.9786107 ),

('Dolce & Gabbana', 'https://wallpapercave.com/wp/wp4518095.jpg', '(212)897-9653', 'email10@gmail.com', '717 5th Avenue', 'New York', 'NY', 10022, 'Dolce1', 40.7619195, -73.9740741);



INSERT INTO couriers
(firstname, lastname, phone_number, email, avatar_url, password, mode_of_transportation)
VALUES ('Jacob', 'Smith', '(347)-555-5553', 'Smith@courier.com', 'img', 'jacobsmith', 'bike');
INSERT INTO categories 
(category_name)
VALUES 
('Women''s Clothing'), 
('Men''s Clothing'), 
('Beauty'), 
('Accessories');

INSERT INTO product_type
(category_id, product_type_name)
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
('Pink'), 
('Nude');

INSERT INTO products
(product_name, brand_id, category_id, product_price, material_id, color_id, product_size, product_description, product_type, quantity)
VALUES 
('Milan Leather Backpack', 1, 4, 200.00, 5 , 1, '22cm x 25cm x 10cm', 'Small leather backpack. Made in Peru.', 28, 5  ), 
('Milan Mini Backpack', 1, 4, 150.00, 5, 13, '17cm x 20cm x 9cm', 'Mini leather backpack. Made in Peru.', 28, 5);


INSERT INTO productImage_id
(product_id, product_image_url, category_id)
VALUES(1,'https://cdn.shopify.com/s/files/1/0082/3558/1504/products/lima-sagrada-small-backpack-black_606x606_b48c910d-33ac-46ce-aeb0-8bb3f7b73f7f_1296x.jpg',4), 
(2,'https://cdn.shopify.com/s/files/1/0082/3558/1504/products/Lima-sagrada-milan-mini-soft-pink-19502_1024x1024_2x_89657b17-5194-4bad-adb6-7f66f686e539_1728x.jpg',4);

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
SELECT * FROM checkoutCart;




