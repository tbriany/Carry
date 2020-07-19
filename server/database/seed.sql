DROP DATABASE if exists carry;
CREATE DATABASE carry;

\c carry

-- users
-- DROP TABLE IF exists customers CASCADE;
CREATE TABLE customers
(
    customer_id SERIAL PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    phone_number VARCHAR UNIQUE,
    email VARCHAR UNIQUE NOT NULL,
    address VARCHAR,
    city VARCHAR,
    state VARCHAR,
    zip_code,
    avatar_url VARCHAR,
    password VARCHAR NOT NULL
);

-- DROP TABLE IF exists stores CASCADE;
CREATE TABLE stores
(
    store_id SERIAL PRIMARY KEY,
    stores_name VARCHAR NOT NULL,
    store_logo VARCHAR NOT NULL,
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

-- DROP TABLE IF exists couriers CASCADE;
CREATE TABLE couriers
(
    courier_id SERIAL PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    phone_number VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    avatar_url VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    mode_of_transportation VARCHAR NOT NULL
);

-- DROP TABLE IF exists categories CASCADE;
CREATE TABLE categories
(
    category_id SERIAL PRIMARY KEY,
    categories_name VARCHAR,
    category_Landing_Logo VARCHAR,
    category_logo VARCHAR
);

-- DROP TABLE IF exists product_type CASCADE;
CREATE TABLE product_type
(
    product_type_id SERIAL PRIMARY KEY,
    category_id INT REFERENCES categories(category_id),
    product_type_name VARCHAR,
    product_type_logo VARCHAR
);


-- DROP TABLE IF exists materials CASCADE;
CREATE TABLE materials
(
    material_id SERIAL PRIMARY KEY,
    material_name VARCHAR
);


-- DROP TABLE IF exists brands CASCADE;
CREATE TABLE brands
(
    brand_id SERIAL PRIMARY KEY,
    brands_name VARCHAR,
    brand_description VARCHAR,
    store_id INT REFERENCES stores(store_id)
);


-- DROP TABLE IF exists colors CASCADE;
CREATE TABLE colors
(
    color_id SERIAL PRIMARY KEY,
    colors_name VARCHAR NOT NULL
);


-- DROP TABLE IF exists products CASCADE;
CREATE TABLE products
(
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR,
    brand_id INT REFERENCES brands(brand_id),
    store_id INT REFERENCES stores(store_id),
    category_id INT REFERENCES categories(category_id),
    product_price INT,
    material_id INT REFERENCES materials(material_id),
    color_id INT REFERENCES colors(color_id),
    product_description VARCHAR,
    product_type INT REFERENCES product_type(product_type_id)
);


-- DROP TABLE IF exists product_inventory CASCADE;
CREATE TABLE product_inventory
(
    product_inventory_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id),
    product_size VARCHAR,
    product_quantity INT
);


-- DROP TABLE IF exists productImage_id CASCADE;
CREATE TABLE productImage_id
(
    product_image_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id),
    product_image_url VARCHAR,
    category_id INT REFERENCES categories(category_id)
);


-- CheckoutCart


-- DROP TABLE IF exists checkout_cart CASCADE;
CREATE TABLE checkout_cart
(
    checkout_cart_id SERIAL PRIMARY KEY,
    session_id VARCHAR,
    store_id INT REFERENCES stores(store_id)
);

-- DROP TABLE IF exists checkout_items CASCADE;
CREATE TABLE checkout_items
(
    checkout_items_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id),
    size VARCHAR,
    quantity INT,
    checkout_cart_id INT REFERENCES checkout_cart(checkout_cart_id)
);

-- Orders 

-- DROP TABLE IF exists receipts CASCADE;
CREATE TABLE receipts
(
    receipt_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    reciept JSON
);


-- DROP TABLE IF exists orders CASCADE;
CREATE TABLE orders
(
    order_id SERIAL PRIMARY KEY,
    order_status VARCHAR ,
    required_date DATE,
    time_ordered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    receipt_id INT REFERENCES receipts(receipt_id),
    customer_id INT REFERENCES customers(customer_id),
    store_id INT REFERENCES stores(store_id),
    courier_id INT REFERENCES couriers(courier_id),
    delivery_fee INT,
    total INT
);




-- Payments

-- DROP TABLE IF exists payment_type CASCADE;
CREATE TABLE payment_type
(
    payment_type_id SERIAL PRIMARY KEY,
    payment_type_name VARCHAR
);


-- DROP TABLE IF exists payment CASCADE;
CREATE TABLE payment
(
    payment_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    payment_type_id INT REFERENCES payment_type(payment_type_id),
    card_number INT,
    exp_date INT,
    cvv INT
);

-- DROP TABLE IF exists bankInfo CASCADE;
CREATE TABLE bankInfo
(
    bankInfo_id SERIAL PRIMARY KEY,
    courier_id INT REFERENCES couriers(courier_id),
    account_number INT,
    routing_number INT
);


INSERT INTO customers
    (firstname, lastname, phone_number, email, address, city, state, zip_code, avatar_url, password)
VALUES
    ('Audrey', 'Hepburn', '(347)-555-5551', 'audrey@gmail.com', '123 5th Ave', 'New York', 'NY', 10011, 'img' , 'testing');

INSERT INTO stores
    (stores_name, store_logo, avatar_url, phone_number, email, address, city, state, zip_code, password, lat, lng)
VALUES
    ('PazLifestyle', '/images/stores/PazLifestyle/PazLifestyleStore.jpg', '/images/stores/PazLifestyle/PazLifeStyleAvatar.png', '(347)-555-5552', 'info@pazlifestyle.com', '123 Paz Street', 'New York', 'NY', 10031, 'lifestyle', 40.760350, -73.964930),

    ('Louis Vuitton', '/images/stores/LouisVuitton/LouisVuittonStore.jpg', '/images/stores/LouisVuitton/LouisVuittonAvatar.jpg', '(212)758-8877', 'cannotfindemail@gmail.com', '1 East 57 St', 'New York', 'NY', 10022, 'Vuitton', 40.760350, -73.12112),

    ('Prada', '/images/stores/Prada/PradaStore.jpg', '/images/stores/Prada/PradaAvatar.jpg', '(212)-327-4200', 'client.service.americas@prada.com', '841 Madison Avenue', 'New York', 'NY', 10021, 'Prada1', 40.770260, -73.966320),

    ('Chanel', '/images/stores/Chanel/ChanelStore.jpg', '/images/stores/Chanel/ChanelAvatar.jpg', '(212)355-5050', 'email@gmail.com', '15 East 57th Street', 'New York', 'NY', 10022, 'Chanel1', 40.762730, -73.972730),

    ('Tiffany & Co.', '/images/stores/Tiffany&Co/Tiffany&CoStore.jpeg', '/images/stores/Tiffany&Co/Tiffany&CoAvatar.jpg', '(212)755-8000', 'noemail@gmail.org', '6 East 57th St', 'New York', 'NY', 10022, 'Tiffany1', 40.762810, -73.973710),

    ('Giorgio Armani New York', '/images/stores/GiorgioArmani/GiorgioArmaniStore.jpg', '/images/stores/GiorgioArmani/GiorgioArmaniAvatar.jpg', '(212)988-9191', 'email2@gmail.com', '760 Madison Avenue', 'New York', 'NY', 10021, 'Giorgio1', 40.772460, -73.964930),

    ('Hermès Men', '/images/stores/HermesMen/HermesMenStore.jpg', '/images/stores/HermesMen/HermesMenAvatar.jpg', '(212)751-3181', 'email4@gmail.com', '690 Madisoon Avenue', 'New York', 'NY', 10065, 'Hermes1', 40.8307354 , -73.9701922),

    ('Dior', '/images/stores/Dior/DiorStore.jpg', '/images/stores/Dior/DiorAvatar.jpg', '(212)931-2950', 'email5@gmail.com', '21 East 57th St', 'New York', 'NY', 10022, 'Dior1', 40.7626074, -73.9726671 ),

    ('Versace', '/images/stores/Versace/VersaceStore.jpg', '/images/stores/Versace/VersaceAvatar.jpg', '(212)317-0224', 'email6@gmail.com', '647 5th Avenue', 'New York', 'NY', 10022, 'Versace1', 40.7594999, -73.9762444),

    ('Fendi', '/images/stores/Fendi/FendiStore.jpg', '/images/stores/Fendi/FendiAvatar.jpg', '(212)897-2244', 'email7@gmail.com', '598 Madisoon Avenue', 'New York', 'NY', 10022, 'fendi1', 40.7626106, -73.9723989),

    ('Sephora', '/images/stores/Sephora/SephoraStore.jpg', '/images/stores/Sephora/SephoraAvatar.jpg', '(212)278-0037', 'email8@gmail.com', '580 5th Avenue', 'Bronx', 'NY', 10036, 'Sephora1', 40.7570994, -73.9791521),

    ('Coach', '/images/stores/Coach/CoachStore.jpg', '/images/stores/Coach/CoachAvatar.jpg', '(212)599-4777', 'email9@gmail.com', '342 Madison Avenue', 'New York', 'NY', 10173, 'Coach1', 40.7541208, 73.9786107 ),

    ('Dolce & Gabbana', '/images/stores/DolceGabbana/DolceGabbanaStore.jpg', '/images/stores/DolceGabbana/DolceGabbanaAvatar.jpg', '(212)897-9653', 'email10@gmail.com', '717 5th Avenue', 'New York', 'NY', 10022, 'Dolce1', 40.7619195, -73.9740741);

INSERT INTO couriers
    (firstname, lastname, phone_number, email, avatar_url, password, mode_of_transportation)
VALUES
    ('Jacob', 'Smith', '(347)-555-5553', 'Smith@courier.com', 'img', 'jacobsmith', 'bike');

INSERT INTO categories
    (categories_name, category_Landing_Logo, category_logo)
VALUES
    ('Women''s', '/images/categories/womens/womensLandingLogo.jpg', '/images/categories/womens/womensLogo.jpg'),
    ('Men''s', '/images/categories/mens/mensLandingLogo.jpg', '/images/categories/mens/mensLogo.jpg'),
    ('Beauty', '/images/categories/beauty/beautyLandingLogo.jpg', '/images/categories/beauty/beautyLogo.jpeg'),
    ('Accessories', '/images/categories/accessories/accessoriesLandingLogo.jpg', '/images/categories/accessories/accessoriesLogo.jpg'),
    ('Home Decor', '/images/categories/homeDecor/homeDecorLandingLogo.jpeg', '/images/categories/homeDecor/homeDecorLogo.png'),
    ('Kids', '/images/categories/kids/kidsLandingLogo.jpg', '/images/categories/kids/kidsLogo.jpg');


INSERT INTO product_type
    (category_id, product_type_name, product_type_logo)
VALUES
    (1, 'Tops', '/images/categories/womens/womensTops.jpg'),
    (1, 'Pants', '/images/categories/womens/womensPants.jpg'),
    (1, 'Dresses', '/images/categories/womens/womensDresses.jpg'),
    (1, 'Jackets & Coats', '/images/categories/womens/womensJackets&Coats.jpg'),
    (1, 'Skirts', '/images/categories/womens/womensSkirts.jpeg'),
    (1, 'Shorts', '/images/categories/womens/womensShorts.jpeg'),
    (1, 'Shirts & Blouses', '/images/categories/womens/womensShirts&Blouses.jpg'),
    (1, 'Jeans', '/images/categories/womens/womensJeans.jpeg'),
    (1, 'Swimwear', '/images/categories/womens/womensSwimwear.jpg'),
    (1, 'Hoodies & Sweatshirts', '/images/categories/womens/womensHoodies&Sweatshirts.jpg'),
    (1, 'Sportswear', '/images/categories/womens/womensSportswear.jpg'),
    (2, 'Tops', '/images/categories/mens/mensTops.jpeg'),
    (2, 'Pants', '/images/categories/mens/mensPants.jpeg'),
    (2, 'Jackets & Coats', '/images/categories/mens/mensJackets&Coats.jpg'),
    (2, 'Shorts', '/images/categories/mens/mensShorts.jpeg'),
    (2, 'Shirts', '/images/categories/mens/mensShirts.jpeg'),
    (2, 'Jeans', '/images/categories/mens/mensJeans.jpeg'),
    (2, 'Swimwear', '/images/categories/mens/mensSwimwear.jpeg'),
    (2, 'Hoodies & Sweatshirts', '/images/categories/mens/mensHoodies&Sweatshirts.jpg'),
    (2, 'Sportswear', '/images/categories/mens/mensSportswear.jpeg'),
    (3, 'Face', '/images/categories/beauty/face.jpg'),
    (3, 'Eyes', '/images/categories/beauty/eyes.jpg'),
    (3, 'Lips', '/images/categories/beauty/lips.jpg'),
    (3, 'Nails', '/images/categories/beauty/nails.jpeg'),
    (3, 'Bath & Body Care', '/images/categories/beauty/bath&BodyCare.jpg'),
    (3, 'Hair', '/images/categories/beauty/hair.jpg'),
    (3, 'Brushes & Tools', '/images/categories/beauty/brushes&Tools.jpg'),
    (4, 'Bags', '/images/categories/accessories/bags.jpg'),
    (4, 'Belts', '/images/categories/accessories/belts.jpg'),
    (4, 'Jewelry', '/images/categories/accessories/jewelry.jpg'),
    (4, 'Hair Accessories', '/images/categories/accessories/hairAccessories.jpg'),
    (4, 'Sunglasses', '/images/categories/accessories/sunglasses.jpg'),
    (4, 'Gloves', '/images/categories/accessories/gloves.jpg'),
    (4, 'Scarves', '/images/categories/accessories/scarves.jpg'),
    (4, 'Hats & Caps', '/images/categories/accessories/hats&Caps.jpg'),
    (4, 'Wallets & Coin purses', '/images/categories/accessories/wallets&CoinPurses.jpg');

INSERT INTO materials
    (material_name)
VALUES
    ('Organic Cotton'),
    ('Organic Linen'),
    ('Hemp'),
    ('Suede'),
    ('Leather'),
    ('Polyester'),
    ('Wool'),
    ('Alpaca');

INSERT INTO brands
    (brands_name, brand_description)
VALUES
    ('Lima Sagrada', 'Lima Sagrada is the name of a project that gives shape to raw materials such as leather in its most basic pure form, resulting in a modern and contemporary design founded by Vanessa Vila. Vanessa Vila is an architect, art director, and a stylist in Lima, Peru.'),
    ('Aynx', 'A brand created out of a common love for high-quality products, nature''s finest materials, and strong economic and environmental engagement. '),
    ('Nutu', 'A regenerative business based on sustainable agroforestry.'), 
    ('Prada S.p.A.', 'Is an Italian luxury fashion house, specializing in leather handbags, travel accessories, shoes, ready-to-wear, perfumes and other fashion accessories, founded in 1913');

INSERT INTO colors
    (colors_name)
VALUES
    ('Black'),
    ('White'),
    ('Green'),
    ('Red'),
    ('Yellow'),
    ('Purple'),
    ('Gray'),
    ('Brown'),
    ('Orange'),
    ('Blue'),
    ('Pink'),
    ('Nude'),
    ('Ivory'), 
    ('Beige');

INSERT INTO products
    (product_name, brand_id, store_id, category_id, product_price, material_id, color_id, product_description, product_type)
VALUES
    ('Milan Leather Backpack', 1, 1, 4, 200.00, 5 , 1, 'Small leather backpack. Made in Peru.', 28),

    ('Milan Mini Backpack', 1, 1, 4, 150.00, 5, 12, 'Mini leather backpack. Made in Peru.', 28),

    ('Fanny Belt Bag', 1, 1, 4, 295.00, 5, 1, 'Fanny belt bag made for a traveler.', 28),

    ('Leather Handbag', 1, 1, 4, 200.00, 5, 8, 'A bag perfect for everything', 28),

    ('Joaquina Top', 2, 1 , 1 , 225.00, 7, 4, 'High neck with ribbon neck detail, ideal to wear with jeans and skirts for a sophisticated but casual look', 1),

    ('Zena Top', 2, 1 , 1, 265.00, 8, 7, 'Hand-loomed long sleeve asymmetrical sweater knit', 1),

    ('Onyx Dress', 2, 1, 1, 300.00, 8, 4, 'A perfect classic go-to dress for the transitional weather', 3),

    ('Moringa Face Oil', 3, 1, 3, 32.95, 1, 1, 'Reduces visible signs of aging, acne scars, psoriasis, and eczema', 21 ),

    ('Moringa Rose Cream', 3, 1, 3, 39.95, 1, 1, 'This formula offers rich hydration and intensive skin regeneration', 21),

    ('Roama Skirt', 2, 1, 1, 130.00, 8, 13, 'Classic go-to pencil mid-length skirt with double slits', 5 ),

    ('Bucket Bag', 4, 3, 4, 2000.00, 5, 1, 'Bucket bag with large woven motif', 28),

    ('Light Sable Printed Dress', 4, 3, 1, 3300.00, 6, 10, 'Light sable printed dress with collar.', 3 ),

    ('Pascua Skirt', 2, 1, 1, 280.00, 8, 1, 'Long skirt, double slit, hand-loom Alpaca skirt.', 5), 

    ('Sunqu Pants', 2, 1, 1, 205.00, 8, 13, 'Perfect for all-year-round weather', 2 ),
    
    ('Anta Pants', 2, 1, 1, 280.00, 8, 13, 'Alpaca ankle pants with front slits', 2), 

    ('Clara Top', 2, 1, 1, 95.00, 8, 14, 'Perfect for all-year-round weather classic piece', 1 );




INSERT INTO product_inventory
    (product_id, product_size, product_quantity)
VALUES
    (1, '22cm x 25cm x 10cm', 123),
    (2, '17cm x 20cm x 9cm', 130),
    (3, '37cm x 64cm', 122),
    (4, '37cm x 64cm', 234),
    (5, 'Small', 232),
    (5, 'Medium', 234),
    (5, 'Large', 234),
    (6, 'Small', 253),
    (6, 'Medium', 131),
    (6, 'Large', 312),
    (7, 'Small', 312),
    (7, 'Medium', 332),
    (7, 'Large', 423),
    (8, 'One Size', 233),
    (9, 'One size', 234),
    (10, 'Small', 233),
    (10, 'Medium', 134),
    (10, 'Large', 243),
    (11, '23cm x 14cm x 17.5',244),
    (12, 'Small', 323),
    (12, 'Medium', 345),
    (12, 'Large', 364),
    (13, 'Small', 223),
    (13, 'Medium', 453),
    (13, 'Large', 394), 
    (14, 'Small', 303),
    (14, 'Medium', 234),
    (14, 'Large', 423), 
    (15, 'Small', 232),
    (15, 'Medium', 253),
    (15, 'Large', 345),
    (16, 'Small', 342),
    (16, 'Medium', 354),
    (16, 'Large', 364);

    
    


INSERT INTO productImage_id
    (product_id, product_image_url, category_id)
VALUES
    (1, '/images/products/accessories/product1.jpg', 4),
    (2, '/images/products/accessories/product2.jpg', 4),
    (3, '/images/products/accessories/product3.jpg', 4),
    (4, '/images/products/accessories/product4.jpg', 4),
    (5, '/images/products/womens/product5.jpg', 1),

    (6, '/images/products/womens/product6.jpg', 1 ),

    (7, '/images/products/womens/product7.jpg', 1),

    (8, '/images/products/beauty/product8.jpg', 3),

    (9, '/images/products/beauty/product9.jpg', 3),

    (10, '/images/products/womens/product10.jpg', 1),

    (11, '/images/products/accessories/product11.jpg', 4),

    (12, '/images/products/womens/product12.jpg', 1),

    (13, '/images/products/womens/product13.jpg', 1), 

    (14, '/images/products/womens/product14.jpg', 1), 

    (15,'/images/products/womens/product15.jpg',1), 

    (16, '/images/products/womens/product16.jpg', 1);


-- SELECT *
-- FROM customers;
-- SELECT *
-- FROM stores;
-- SELECT *
-- FROM couriers;
-- SELECT *
-- FROM categories;
-- SELECT *
-- FROM product_type;
-- SELECT *
-- FROM materials;
-- SELECT *
-- FROM brands;
-- SELECT *
-- FROM colors;
-- SELECT *
-- FROM products;
-- SELECT *
-- FROM sizes;
-- SELECT *
-- FROM productImage_id;
-- SELECT *
-- FROM orders;
-- SELECT *
-- FROM ordersItems;
-- SELECT *
-- FROM payment_type;
-- SELECT *
-- FROM payment;
-- SELECT *
-- FROM bankInfo;
-- SELECT *
-- FROM receipts;
-- SELECT *
-- FROM checkout_cart;
-- SELECT * FROM 
-- checkout_items;


