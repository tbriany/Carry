DROP DATABASE if exists carry;
CREATE DATABASE carry;

\c carry

-- users
CREATE TABLE customers(
    customer_id SERIAL PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    phone_number VARCHAR UNIQUE,
    email VARCHAR UNIQUE NOT NULL,
    address VARCHAR,
    city VARCHAR,
    state VARCHAR,
    zip_code INT,
    avatar_url VARCHAR,
    password VARCHAR NOT NULL
);

CREATE TABLE stores(
    store_id SERIAL PRIMARY KEY,
    store_name VARCHAR NOT NULL,
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
    category_name VARCHAR,
    category_Landing_Logo VARCHAR,
    category_logo VARCHAR
);

CREATE TABLE product_type(
    product_type_id SERIAL PRIMARY KEY,
    category_id INT REFERENCES categories(category_id),
    product_type_name VARCHAR,
    product_type_logo VARCHAR
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
    store_id INT REFERENCES stores(store_id),
    category_id INT REFERENCES categories(category_id),
    product_price INT,
    material_id INT REFERENCES materials(material_id),
    color_id INT REFERENCES colors(color_id),
    product_description VARCHAR,
    product_type INT REFERENCES product_type(product_type_id),
    quantity INT
);

CREATE TABLE sizes(
    sizes_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id),
    product_size VARCHAR
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
    quantity INT
);

CREATE TABLE checkouts (
     checkout_id SERIAL PRIMARY KEY,
     session_id VARCHAR,
     cart VARCHAR
);

-- Orders 

CREATE TABLE receipts(
    receipt_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    reciept VARCHAR 
);

CREATE TABLE orders(
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
(store_name, store_logo, avatar_url, phone_number, email, address, city, state, zip_code, password, lat, lng)
VALUES 
('PazLifestyle', 'https://cdn.shopify.com/s/files/1/0082/3558/1504/files/Aube1_2_2048x.jpg?v=1583910819','https://cdn.shopify.com/s/files/1/0082/3558/1504/files/pazlogo3_x45@2x.png', '(347)-555-5552', 'info@pazlifestyle.com', 'address', 'city', 'state', 00000, 'lifestyle', 40.312321, -73.12112),

('Louis Vuitton', 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-find-a-store-us-louis-vuitton-denver-cherry-creek-curbside-pickup-only--StFi_Louis_Vuitton_Denver_CherryCreek_DI3_1.jpg', 'https://i.pinimg.com/originals/ce/6d/3e/ce6d3ed43b69df168ca4ce8a5e602759.jpg', '(212)758-8877)', 'cannotfindemail@gmail.com', '1 East 57 St', 'New York', 'NY', 10022, 'Vuitton', 40.760350, -73.975080),

('Prada', 'https://i.pinimg.com/originals/ee/09/6d/ee096de9605daa58fd9c4df25b11fe5b.jpg', 'https://cdn.shopify.com/s/files/1/0049/8489/7625/products/Prada_580x.jpg', '(212)-327-4200', 'client.service.americas@prada.com','841 Madison Avenue', 'New York', 'NY',10021, 'Prada1', 40.770260,
-73.966320),

('Chanel', 'https://i2.wp.com/thecurrentdaily.com/wp-content/uploads/2018/02/chanel-storeofthefuture.jpg?fit=1400%2C600&ssl=1', 'https://www.agneseangelini.com/wp-content/uploads/2019/04/coco.jpg', '(212)355-5050', 'email@gmail.com','15 East 57th Street','New York', 'NY', 10022,'Chanel1', 40.762730, -73.972730),

('Tiffany & Co.', 'https://media.tiffany.com/is/image/tiffanydm/1440x912_NSO?$tile$&wid=1440&hei=912', 'https://i.pinimg.com/originals/72/c5/69/72c56940aa7b09daf1c51855d8d062ec.jpg', '(212)755-8000', 'noemail@gmail.org','6 East 57th St', 'New York', 'NY', 10022, 'Tiffany1', 40.762810, -73.973710), 

('Giorgio Armani New York', 'https://www.mygiftcardsite.us.com/wp-content/uploads/2018/03/Giorgio-Armani-Store-Front-Doha-Airport.jpg', 'https://cdn11.bigcommerce.com/s-sq9zkarfah/images/stencil/1280x1280/products/102879/127279/Giorgio-Armani-Logo-Decal-Sticker__10076.1510657355.jpg', '(212)988-9191', 'email2@gmail.com', '760 Madison Avenue', 'New York', 'NY', 10021, 'Giorgio1', 40.772460, -73.964930),

('Hermès Men', 'https://www.yourmindschool.com/wp-content/uploads/2017/09/how-to-get-hermes-birkins-my-experiences-on-buying-5-birkins-in-3-years.jpg', 'https://cdn11.bigcommerce.com/s-sq9zkarfah/images/stencil/1280x1280/products/102859/136658/Hermes-Logo-Decal-Sticker__53440.1510913981.jpg', '(212)751-3181', 'email4@gmail.com', '690 Madisoon Avenue', 'New York', 'NY', 10065, 'Hermes1',40.8307354 ,-73.9701922),

 ('Dior', 'https://www.dior.com/couture/var/dior/storage/images/10682899/231-eng-HK/exposition-dallas9_width_1400.jpg', 'https://s3images.coroflot.com/user_files/individual_files/723615_dhooks0vasdxe8nc74sr8nz96.jpg', '(212)931-2950', 'email5@gmail.com','21 East 57th St', 'New York', 'NY', 10022, 'Dior1',40.7626074,-73.9726671 ), 

 ('Versace', 'https://images.businessoffashion.com/site/uploads/2016/04/shutterstock_362797619.jpg?auto=format%2Ccompress&crop=top&fit=crop&h=275&w=494', 'https://cdn11.bigcommerce.com/s-sq9zkarfah/images/stencil/1280x1280/products/102679/136824/Versace-Logo-Decal-Sticker__06770.1510914073.jpg','(212)317-0224', 'email6@gmail.com', '647 5th Avenue', 'New York', 'NY', 10022, 'Versace1', 40.7594999, -73.9762444), 

 ('Fendi', 'https://aeworld.com/wp-content/uploads/2018/11/fendi-dubai-mall-store-3.jpg', 'https://ih1.redbubble.net/image.1000144398.0490/farp,small,wall_texture,product,750x1000.jpg', '(212)897-2244', 'email7@gmail.com', '598 Madisoon Avenue', 'New York', 'NY', 10022, 'fendi1', 40.7626106,-73.9723989), 

 ('Sephora', 'https://retailtouchpoints.com/wp-content/uploads/2020/02/sephora-960x540.jpg','https://i.pinimg.com/originals/24/a5/3f/24a53fedd242af9594f1c0e80ae9b647.png', '(212)278-0037', 'email8@gmail.com', '580 5th Avenue', 'New York', 'NY', 10036, 'Sephora1', 40.7570994, -73.9791521), 

 ('Coach', 'https://d2eohwa6gpdg50.cloudfront.net/content/uploads/2018/10/22094408/19.jpg', 'https://i.pinimg.com/originals/9a/8a/67/9a8a676b151cf64e56161be07a2aca4f.png', '(212)599-4777', 'email9@gmail.com', '342 Madison Avenue', 'New York', 'NY', 10173, 'Coach1', 40.7541208, 73.9786107 ),

('Dolce & Gabbana', 'https://static.dezeen.com/uploads/2019/06/dolce-gabbana-carbondale-digital-fresco-interiors-shops-rome-italy_dezeen_hero-2.jpg','https://wallpapercave.com/wp/wp4518095.jpg', '(212)897-9653', 'email10@gmail.com', '717 5th Avenue', 'New York', 'NY', 10022, 'Dolce1', 40.7619195, -73.9740741);

INSERT INTO couriers
(firstname, lastname, phone_number, email, avatar_url, password, mode_of_transportation)
VALUES ('Jacob', 'Smith', '(347)-555-5553', 'Smith@courier.com', 'img', 'jacobsmith', 'bike');

INSERT INTO categories 
(category_name, category_Landing_Logo, category_logo)
VALUES 
('Women''s', 'https://imageproxy.viewbook.com/80941/b3458b281396eddd7ea1370e84434090_hd.jpg','https://cdn1.dotesports.com/wp-content/uploads/2018/11/23152339/Hangzhou-Spark1.jpg'), 
('Men''s','https://thumbs.dreamstime.com/b/fashion-man-men-sketches-white-background-autumn-127439059.jpg', 'https://www.aljazeera.com/mritems/Images/2019/6/13/ce0ece26ee1348f2b1c453f314dc0a6e_18.jpg'), 
('Beauty','https://cdn.shopify.com/s/files/1/0580/0721/articles/iStock-1170104811_95fed370-9e0c-4fd8-a668-8d7e806c8f05_grande.jpg', 'https://www.lovearoma.co.uk/blog/wp-content/uploads/2015/05/bg-red-carpet.jpg'), 
('Accessories', 'https://www.thestatesman.com/wp-content/uploads/2017/12/accessories.jpg','https://static.bhphoto.com/images/images500x500/1391171441_1026417.jpg'),
('Home Decor', 'https://cb2.scene7.com/is/image/CB2/122919_m_super_decor_accessories?wid=670&qlt=65', 'https://static.bhphoto.com/images/images500x500/1391171441_1026417.jpg'),
('Kids', 'https://image.cnbcfm.com/api/v1/image/106032900-1563825608021rockets.jpg?v=1563825858&w=678&h=381','https://cdn1.dotesports.com/wp-content/uploads/2018/11/23152339/Hangzhou-Spark1.jpg');

INSERT INTO product_type
(category_id, product_type_name, product_type_logo)
VALUES 
(1, 'Tops', 'https://static.bhphoto.com/images/images500x500/1391171441_1026417.jpg'),
(1, 'Pants', 'https://www.lovearoma.co.uk/blog/wp-content/uploads/2015/05/bg-red-carpet.jpg'),
(1, 'Dresses', 'https://www.aljazeera.com/mritems/Images/2019/6/13/ce0ece26ee1348f2b1c453f314dc0a6e_18.jpg'),
(1, 'Jackets & Coats', 'https://cdn1.dotesports.com/wp-content/uploads/2018/11/23152339/Hangzhou-Spark1.jpg'),
(1, 'Skirts', 'https://static.bhphoto.com/images/images500x500/1391171441_1026417.jpg'),
(1, 'Shorts', 'https://www.lovearoma.co.uk/blog/wp-content/uploads/2015/05/bg-red-carpet.jpg'),
(1, 'Shirts & Blouses', 'https://www.aljazeera.com/mritems/Images/2019/6/13/ce0ece26ee1348f2b1c453f314dc0a6e_18.jpg'),
(1, 'Jeans', 'https://cdn1.dotesports.com/wp-content/uploads/2018/11/23152339/Hangzhou-Spark1.jpg'),
(1, 'Swimwear', 'https://static.bhphoto.com/images/images500x500/1391171441_1026417.jpg'),
(1, 'Hoodies & Sweatshirts', 'https://www.lovearoma.co.uk/blog/wp-content/uploads/2015/05/bg-red-carpet.jpg'),
(1, 'Sportswear', 'https://www.aljazeera.com/mritems/Images/2019/6/13/ce0ece26ee1348f2b1c453f314dc0a6e_18.jpg'),
(2, 'Tops', 'https://cdn1.dotesports.com/wp-content/uploads/2018/11/23152339/Hangzhou-Spark1.jpg'),
(2, 'Pants', 'https://static.bhphoto.com/images/images500x500/1391171441_1026417.jpg'),
(2, 'Jackets & Coats', 'https://www.lovearoma.co.uk/blog/wp-content/uploads/2015/05/bg-red-carpet.jpg'),
(2, 'Shorts', 'https://www.aljazeera.com/mritems/Images/2019/6/13/ce0ece26ee1348f2b1c453f314dc0a6e_18.jpg'),
(2, 'Shirts & Blouses', 'https://cdn1.dotesports.com/wp-content/uploads/2018/11/23152339/Hangzhou-Spark1.jpg'),
(2, 'Jeans', 'https://static.bhphoto.com/images/images500x500/1391171441_1026417.jpg'),
(2, 'Swimwear', 'https://www.lovearoma.co.uk/blog/wp-content/uploads/2015/05/bg-red-carpet.jpg'),
(2, 'Hoodies & Sweatshirts', 'https://www.aljazeera.com/mritems/Images/2019/6/13/ce0ece26ee1348f2b1c453f314dc0a6e_18.jpg'),
(2, 'Sportswear', 'https://cdn1.dotesports.com/wp-content/uploads/2018/11/23152339/Hangzhou-Spark1.jpg'),
(3, 'Face', 'https://static.bhphoto.com/images/images500x500/1391171441_1026417.jpg'),
(3, 'Eyes', 'https://www.lovearoma.co.uk/blog/wp-content/uploads/2015/05/bg-red-carpet.jpg'),
(3, 'Lips', 'https://www.aljazeera.com/mritems/Images/2019/6/13/ce0ece26ee1348f2b1c453f314dc0a6e_18.jpg'),
(3, 'Nails', 'https://cdn1.dotesports.com/wp-content/uploads/2018/11/23152339/Hangzhou-Spark1.jpg'),
(3, 'Bath & Body Care', 'https://static.bhphoto.com/images/images500x500/1391171441_1026417.jpg'),
(3, 'Hair', 'https://www.lovearoma.co.uk/blog/wp-content/uploads/2015/05/bg-red-carpet.jpg'),
(3, 'Brushes & Tools', 'https://www.aljazeera.com/mritems/Images/2019/6/13/ce0ece26ee1348f2b1c453f314dc0a6e_18.jpg'),
(4, 'Bags', 'https://cdn1.dotesports.com/wp-content/uploads/2018/11/23152339/Hangzhou-Spark1.jpg'),
(4, 'Belts', 'https://static.bhphoto.com/images/images500x500/1391171441_1026417.jpg'),
(4, 'Jewelry', 'https://www.lovearoma.co.uk/blog/wp-content/uploads/2015/05/bg-red-carpet.jpg'),
(4, 'Hair Accessories', 'https://www.aljazeera.com/mritems/Images/2019/6/13/ce0ece26ee1348f2b1c453f314dc0a6e_18.jpg'),
(4, 'Sunglasses', 'https://cdn1.dotesports.com/wp-content/uploads/2018/11/23152339/Hangzhou-Spark1.jpg'),
(4, 'Gloves', 'https://static.bhphoto.com/images/images500x500/1391171441_1026417.jpg'),
(4, 'Scarves', 'https://www.lovearoma.co.uk/blog/wp-content/uploads/2015/05/bg-red-carpet.jpg'),
(4, 'Hats & Caps', 'https://www.aljazeera.com/mritems/Images/2019/6/13/ce0ece26ee1348f2b1c453f314dc0a6e_18.jpg'),
(4, 'Wallets & Coin purses', 'https://cdn1.dotesports.com/wp-content/uploads/2018/11/23152339/Hangzhou-Spark1.jpg');

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
(product_name, brand_id, store_id, category_id, product_price, material_id, color_id, product_description, product_type, quantity)
VALUES 
('Milan Leather Backpack', 1, 1, 4, 200.00, 5 , 1, 'Small leather backpack. Made in Peru.', 28, 5), 
('Milan Mini Backpack', 1, 1, 4, 150.00, 5, 13, 'Mini leather backpack. Made in Peru.', 28, 5);




INSERT INTO sizes 
(product_id, product_size) 
VALUES 
(1, '22cm x 25cm x 10cm'),
(2, '17cm x 20cm x 9cm');


INSERT INTO productImage_id
(product_id, product_image_url, category_id)
VALUES
(1,'https://cdn.shopify.com/s/files/1/0082/3558/1504/products/lima-sagrada-small-backpack-black_606x606_b48c910d-33ac-46ce-aeb0-8bb3f7b73f7f_1296x.jpg', 4), 
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
SELECT * FROM sizes;
SELECT * FROM productImage_id;
SELECT * FROM orders;
SELECT * FROM ordersItems;
SELECT * FROM payment_type;
SELECT * FROM payment;
SELECT * FROM bankInfo;
SELECT * FROM receipts;
SELECT * FROM checkoutCart;

