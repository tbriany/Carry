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
    product_type INT REFERENCES product_type(product_type_id)
);

CREATE TABLE product_inventory(
    product_inventory_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id),
    product_size VARCHAR,
    product_quantity INT
);

CREATE TABLE productImage_id(
    product_image_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id),
    product_image_url VARCHAR,
    category_id INT REFERENCES categories(category_id)
);


-- CheckoutCart

CREATE TABLE checkout_cart  (
     checkout_cart_id SERIAL PRIMARY KEY,
     session_id VARCHAR,
     store_id INT REFERENCES stores(store_id)
);


CREATE TABLE checkout_items(
    checkout_items_id SERIAL PRIMARY KEY,
    product_id  INT REFERENCES products(product_id),
    size VARCHAR,
    quantity INT,
    checkout_cart_id INT REFERENCES checkout_cart(checkout_cart_id) 
);

-- Orders 

CREATE TABLE receipts(
    receipt_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    reciept JSON 
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
('PazLifestyle', 'http://localhost:4008/images/stores/PazLifestyle/PazLifestyleLogo.jpg','http://localhost:4008/images/stores/PazLifestyle/PazLifeStyleAvatar.png', '(347)-555-5552', 'info@pazlifestyle.com', '123 Paz Street', 'New York', 'NY', 10031, 'lifestyle', 40.760350, -73.964930),

('Louis Vuitton', 'http://localhost:4008/images/stores/LouisVuitton/LouisVuittonLogo.jpg', 'http://localhost:4008/images/stores/LouisVuitton/LouisVuittonAvatar.jpg', '(212)758-8877', 'cannotfindemail@gmail.com', '1 East 57 St', 'New York', 'NY', 10022, 'Vuitton', 40.760350, -73.12112),

('Prada', 'http://localhost:4008/images/stores/Prada/PradaLogo.jpg', 'http://localhost:4008/images/stores/Prada/PradaAvatar.jpg', '(212)-327-4200', 'client.service.americas@prada.com','841 Madison Avenue', 'New York', 'NY',10021, 'Prada1', 40.770260, -73.966320),

('Chanel', 'http://localhost:4008/images/stores/Chanel/ChanelLogo.jpg', 'http://localhost:4008/images/stores/Chanel/ChanelAvatar.jpg', '(212)355-5050', 'email@gmail.com','15 East 57th Street','New York', 'NY', 10022,'Chanel1', 40.762730, -73.972730),

('Tiffany & Co.', 'http://localhost:4008/images/stores/Tiffany&Co/Tiffany&CoLogo.jpeg', 'http://localhost:4008/images/stores/Tiffany&Co/Tiffany&CoAvatar.jpg', '(212)755-8000', 'noemail@gmail.org','6 East 57th St', 'New York', 'NY', 10022, 'Tiffany1', 40.762810, -73.973710), 

('Giorgio Armani New York', 'http://localhost:4008/images/stores/GiorgioArmani/GiorgioArmaniLogo.jpg', 'https://cdn11.bigcommerce.com/s-sq9zkarfah/images/stencil/1280x1280/products/102879/127279/Giorgio-Armani-Logo-Decal-Sticker__10076.1510657355.jpg', '(212)988-9191', 'email2@gmail.com', '760 Madison Avenue', 'New York', 'NY', 10021, 'Giorgio1', 40.772460, -73.964930),

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
('Women''s', 'http://localhost:4008/images/categories/womens/womensLandingLogo.jpg','http://localhost:4008/images/categories/womens/womensLogo.jpg'), 
('Men''s','http://localhost:4008/images/categories/mens/mensLandingLogo.jpg', 'https://content.api.news/v3/images/bin/f5e805f5912487f926d29b853ff76709'), 
-- ('Beauty','https://cdn.shopify.com/s/files/1/0580/0721/articles/iStock-1170104811_95fed370-9e0c-4fd8-a668-8d7e806c8f05_grande.jpg', 'https://edited.beautybay.com/wp-content/uploads/2019/04/edited_april19_revolution_skincare_landscape.jpg'), 
('Beauty','http://localhost:4008/images/categories/beauty/beautyLandingLogo.jpg', 'http://localhost:4008/images/categories/beauty/beautyLogo.jpeg'), 
('Accessories', 'http://localhost:4008/images/categories/accessories/accessoriesLandingLogo.jpg','http://localhost:4008/images/categories/accessories/accessoriesLogo.jpg'),
('Home Decor', 'http://localhost:4008/images/categories/homeDecor/homeDecorLandingLogo.jpeg', 'http://localhost:4008/images/categories/homeDecor/homeDecorLogo.png'),
('Kids', 'http://localhost:4008/images/categories/kids/kidsLandingLogo.jpg','http://localhost:4008/images/categories/kids/kidsLogo.jpg');


INSERT INTO product_type
(category_id, product_type_name, product_type_logo)
VALUES 
(1, 'Tops', 'http://localhost:4008/images/categories/womens/womensTops.jpg'),
(1, 'Pants', 'http://localhost:4008/images/categories/womens/womensPants.jpg'),
(1, 'Dresses', 'http://localhost:4008/images/categories/womens/womensDresses.jpg'),
(1, 'Jackets & Coats', 'http://localhost:4008/images/categories/womens/womensJackets&Coats.jpg'),
(1, 'Skirts', 'http://localhost:4008/images/categories/womens/womensSkirts.jpeg'),
(1, 'Shorts', 'http://localhost:4008/images/categories/womens/womensShorts.jpeg'),
(1, 'Shirts & Blouses', 'http://localhost:4008/images/categories/womens/womensShirts&Blouses.jpg'),
(1, 'Jeans', 'http://localhost:4008/images/categories/womens/womensJeans.jpeg'),
(1, 'Swimwear', 'http://localhost:4008/images/categories/womens/womensSwimwear.jpg'),
(1, 'Hoodies & Sweatshirts', 'http://localhost:4008/images/categories/womens/womensHoodies&Sweatshirts.jpg'),
(1, 'Sportswear', 'https://im01.itaiwantrade.com/2190bacc-80e8-4892-8690-565b80c7a024/5433-2-480x480.png'),
(2, 'Tops', 'http://localhost:4008/images/categories/mens/mensTops.jpeg'),
(2, 'Pants', 'http://localhost:4008/images/categories/mens/mensPants.jpeg'),
(2, 'Jackets & Coats', 'http://localhost:4008/images/categories/mens/mensJackets&Coats.jpg'),
(2, 'Shorts', 'http://localhost:4008/images/categories/mens/mensShorts.jpeg'),
(2, 'Shirts', 'http://localhost:4008/images/categories/mens/mensShirts.jpeg'),
(2, 'Jeans', 'http://localhost:4008/images/categories/mens/mensJeans.jpeg'),
(2, 'Swimwear', 'http://localhost:4008/images/categories/mens/mensSwimwear.jpeg'),
(2, 'Hoodies & Sweatshirts', 'http://localhost:4008/images/categories/mens/mensHoodies&Sweatshirts.jpg'),
(2, 'Sportswear', 'http://localhost:4008/images/categories/mens/mensSportswear.jpeg'),
(3, 'Face', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-img.instyle.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F684xflex%2Fpublic%2Fimages%2F2018%2F04%2F042318-foundation-lead.jpg%3Fitok%3DA0rU78H2&w=450&c=sc&poi=face&q=85'),
(3, 'Eyes', 'http://localhost:4008/images/categories/beauty/eyes.jpg'),
(3, 'Lips', 'http://localhost:4008/images/categories/beauty/lips.jpg'),
(3, 'Nails', 'http://localhost:4008/images/categories/beauty/nails.jpeg'),
(3, 'Bath & Body Care', 'http://localhost:4008/images/categories/beauty/bath&BodyCare.jpg'),
(3, 'Hair', 'http://localhost:4008/images/categories/beauty/hair.jpg'),
(3, 'Brushes & Tools', 'http://localhost:4008/images/categories/beauty/brushes&Tools.jpg'),
(4, 'Bags', 'http://localhost:4008/images/categories/accessories/bags.jpg'),
(4, 'Belts', 'http://localhost:4008/images/categories/accessories/belts.jpg'),
(4, 'Jewelry', 'http://localhost:4008/images/categories/accessories/jewelry.jpg'),
(4, 'Hair Accessories', 'http://localhost:4008/images/categories/accessories/hairAccessories.jpg'),
(4, 'Sunglasses', 'http://localhost:4008/images/categories/accessories/sunglasses.jpg'),
(4, 'Gloves', 'https://cdn11.bigcommerce.com/s-sn4d4efuta/images/stencil/337x337/products/25927/136500/40-Winter-Gloves-Faux-Suede-Full-Finger-Gloves-Women-Thicken-Warm-Mittens-Female-Elegant-Wrist__49173.1574214557.jpg?c=1'),
(4, 'Scarves', 'http://localhost:4008/images/categories/accessories/scarves.jpg'),
(4, 'Hats & Caps', 'http://localhost:4008/images/categories/accessories/hats&Caps.jpg'),
(4, 'Wallets & Coin purses', 'http://localhost:4008/images/categories/accessories/wallets&CoinPurses.jpg');

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
(brand_name, brand_description)
VALUES 
('Lima Sagrada', 'Lima Sagrada is the name of a project that gives shape to raw materials such as leather in its most basic pure form, resulting in a modern and contemporary design founded by Vanessa Vila. Vanessa Vila is an architect, art director, and a stylist in Lima, Peru.'), 
('Aynx', 'A brand created out of a common love for high-quality products, nature''s finest materials, and strong economic and environmental engagement. '),
('Nutu', 'A regenerative business based on sustainable agroforestry.');

INSERT INTO colors
(color_name)
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
('Ivory');

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

('Bucket Bag', null, 3, 4, 2000.00, 5, 1, 'Bucket bag with large woven motif', 28), 

('Light Sable Printed Dress', null, 3, 1, 3300.00, 6, 10, 'Light sable printed dress with collar.', 3 ), 

('Pascua Skirt', 2, 1,1, 280.00, 8, 1, 'Long skirt, double slit, hand-loom Alpaca skirt.', 5);


INSERT INTO product_inventory
    (product_id, product_size, product_quantity)
VALUES
    (1, '22cm x 25cm x 10cm', 5),
    (2, '17cm x 20cm x 9cm', 5),
    (3, '37cm x 64cm', 6),
    (4, '37cm x 64cm',7), 
    (5, 'Small', 4),
    (5, 'Medium',5),
    (5, 'Large', 5),
    (6, 'Small',3),
    (6, 'Medium', 42),
    (6, 'Large', 34),
    (7, 'Small', 33), 
    (7, 'Medium',34),
    (7, 'Large',64),
    (8, 'One Size',15),
    (9, 'One size',12),
    (10, 'Small', 23),
    (10, 'Medium',24), 
    (10, 'Large',14),
    (11, '23cm x 14cm x 17.5',8), 
    (12, 'Small',37),
    (12, 'Medium',39), 
    (12, 'Large',33), 
    (13, 'Small',21),
    (13, 'Medium',45),
    (13, 'Large',39);


INSERT INTO productImage_id
(product_id, product_image_url, category_id)
VALUES
    (1, 'https://cdn.shopify.com/s/files/1/0082/3558/1504/products/lima-sagrada-small-backpack-black_606x606_b48c910d-33ac-46ce-aeb0-8bb3f7b73f7f_1296x.jpg', 4),
    (2, 'https://cdn.shopify.com/s/files/1/0082/3558/1504/products/Lima-sagrada-milan-mini-soft-pink-19502_1024x1024_2x_89657b17-5194-4bad-adb6-7f66f686e539_1728x.jpg', 4),
    (3, 'https://cdn.shopify.com/s/files/1/0082/3558/1504/products/lima-sagrada-urban-fanny-pack-front_606x606_2d57ea5f-8afc-4301-a3cf-03bfd70c3fdd_1296x.jpg', 4), 
    (4, 'https://cdn.shopify.com/s/files/1/0082/3558/1504/products/Lima-sagrada-plastic-bag-brown-19424_1296x.jpg?', 4), 
    (5, 'https://cdn.shopify.com/s/files/1/0082/3558/1504/products/JOAQUINA-TOP_-NOAH-PANT_FRONT_1_2_720x.jpg', 1), 
    (6,'https://cdn.shopify.com/s/files/1/0082/3558/1504/products/ZENA-SWEATER_LEE-SKIRT_FRONT_1_1_1080x.jpg?', 1 ), 
    (7, 'https://cdn.shopify.com/s/files/1/0082/3558/1504/products/AYNI_FALL_WAINTER_1713299_-_ONYX_900x.jpg?v=1585956025', 1), 

    (8, 'https://cdn.shopify.com/s/files/1/0082/3558/1504/products/IMG_5934-Edit_copy_8e3b2ce4-5c6e-4a04-b910-d3c69e728b3b_1296x.jpg', 3), 

    (9, 'https://cdn.shopify.com/s/files/1/0082/3558/1504/products/IMG_7209-Edit_1296x.jpg', 3), 

    (10, 'https://cdn.shopify.com/s/files/1/0082/3558/1504/products/ROAMA_SKIRT_460x.jpg?v=1585956029', 1), 

    (11, 'https://www.prada.com/content/dam/prada_products/1/1BE/1BE049/2DI4F0002/1BE049_2DI4_F0002_V_OOO_SLR.png/_jcr_content/renditions/cq5dam.web.white.2560x2560.jpeg', 4), 

    (12, 'https://www.prada.com/content/dam/prada_products/P/P3A/P3A78/1WWSF0216/P3A78_1WWS_F0216_S_201_MDF.png/_jcr_content/renditions/cq5dam.web.white.2560x2560.jpeg', 1), 

    (13, 'https://cdn.shopify.com/s/files/1/0082/3558/1504/products/MEJIA_TOP_PASCUA_PANT_FRONT_540x.jpg?v=1585956028', 1);



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


