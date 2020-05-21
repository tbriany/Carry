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
('PazLifestyle', 'https://cdn.shopify.com/s/files/1/0082/3558/1504/files/Aube1_2_2048x.jpg?v=1583910819','https://cdn.shopify.com/s/files/1/0082/3558/1504/files/pazlogo3_x45@2x.png', '(347)-555-5552', 'info@pazlifestyle.com', '123 Paz Street', 'New York', 'NY', 10031, 'lifestyle', 40.760350, -73.964930),

('Louis Vuitton', 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-find-a-store-us-louis-vuitton-denver-cherry-creek-curbside-pickup-only--StFi_Louis_Vuitton_Denver_CherryCreek_DI3_1.jpg', 'https://i.pinimg.com/originals/ce/6d/3e/ce6d3ed43b69df168ca4ce8a5e602759.jpg', '(212)758-8877', 'cannotfindemail@gmail.com', '1 East 57 St', 'New York', 'NY', 10022, 'Vuitton', 40.760350, -73.12112),

('Prada', 'https://i.pinimg.com/originals/ee/09/6d/ee096de9605daa58fd9c4df25b11fe5b.jpg', 'https://cdn.shopify.com/s/files/1/0049/8489/7625/products/Prada_580x.jpg', '(212)-327-4200', 'client.service.americas@prada.com','841 Madison Avenue', 'New York', 'NY',10021, 'Prada1', 40.770260, -73.966320),

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
('Women''s', 'https://imageproxy.viewbook.com/80941/b3458b281396eddd7ea1370e84434090_hd.jpg','https://www.voguehk.com/media/2019/10/00001PFW_DAY7_Vogueint_30sep19_credit_Jonathan-Daniel-Pryce_23-1280x853.jpg'), 
('Men''s','https://thumbs.dreamstime.com/b/fashion-man-men-sketches-white-background-autumn-127439059.jpg', 'https://content.api.news/v3/images/bin/f5e805f5912487f926d29b853ff76709'), 
-- ('Beauty','https://cdn.shopify.com/s/files/1/0580/0721/articles/iStock-1170104811_95fed370-9e0c-4fd8-a668-8d7e806c8f05_grande.jpg', 'https://edited.beautybay.com/wp-content/uploads/2019/04/edited_april19_revolution_skincare_landscape.jpg'), 
('Beauty','https://cdn.shopify.com/s/files/1/0580/0721/articles/iStock-1170104811_95fed370-9e0c-4fd8-a668-8d7e806c8f05_grande.jpg', 'https://s3.ap-south-1.amazonaws.com/hsdreams1/pins/2019/04/big/2865c49675193db171dfa50162fbb4f1.jpeg'), 
('Accessories', 'https://www.thestatesman.com/wp-content/uploads/2017/12/accessories.jpg','https://cdn.shopify.com/s/files/1/0298/0353/products/0_c278b29e-51ba-42b3-a300-c8c87b32ac86_1024x1024.jpg?v=1571317845'),
('Home Decor', 'https://cb2.scene7.com/is/image/CB2/122919_m_super_decor_accessories?wid=670&qlt=65', 'https://guinwa.com/wp-content/uploads/2019/01/Screen-Shot-2019-01-29-at-11.15.35-AM-1160x770.png'),
('Kids', 'https://image.cnbcfm.com/api/v1/image/106032900-1563825608021rockets.jpg?v=1563825858&w=678&h=381','https://cdn.shopify.com/s/files/1/0053/7113/4055/articles/Susukoshi-gender-neutral-baby-clothes-babydonkie_1600x.jpg?v=1558919508');


INSERT INTO product_type
(category_id, product_type_name, product_type_logo)
VALUES 
(1, 'Tops', 'https://ae01.alicdn.com/kf/HTB1MWa5B5OYBuNjSsD4q6zSkFXa7/Loose-Retro-Style-Early-Flower-Print-Shirt-Women-s-Shirts-Clothes-Kawaii-Ulzzang-Vintage-Female-Punk.jpg'),
(1, 'Pants', 'https://cfcdn.zulily.com/images/cache/product/452x1000/286848/zu55352758_main_tm1518815113.jpg'),
(1, 'Dresses', 'https://n.nordstrommedia.com/ImageGallery/store/product/Zoom/13/_107141393.jpg?h=365&w=240&dpr=2&quality=45&fit=fill&fm=jpg'),
(1, 'Jackets & Coats', 'https://img-static.tradesy.com/item/26514616/ted-baker-pink-melisar-dusty-wide-collar-wrap-women-s-coat-size-8-m-0-0-650-650.jpg'),
(1, 'Skirts', 'https://target.scene7.com/is/image/Target/GUEST_9c278ec1-c44b-4612-b443-7881eb859ad6?wid=488&hei=488&fmt=pjpeg'),
(1, 'Shorts', 'https://target.scene7.com/is/image/Target/GUEST_cabe96d5-3340-408b-a70c-756f24c6eaa5?hei=300&qlt=80&fmt=pjpeg'),
(1, 'Shirts & Blouses', 'https://images.takeluckhome.com/images/392x588/201611/J/women-s-summer-blouses-v-neck-cuffed-sleeve-blouse-shirts-tops_1479382392925.jpg'),
(1, 'Jeans', 'https://i.insider.com/5dcd5e913afd371aa87d4ce5?width=500&format=jpeg&auto=webp'),
(1, 'Swimwear', 'https://images-na.ssl-images-amazon.com/images/I/51aBQQcqxrL._AC_UX385_.jpg'),
(1, 'Hoodies & Sweatshirts', 'https://i.pinimg.com/originals/76/60/43/766043b32e2d7b8845571625be402e27.jpg'),
(1, 'Sportswear', 'https://im01.itaiwantrade.com/2190bacc-80e8-4892-8690-565b80c7a024/5433-2-480x480.png'),
(2, 'Tops', 'https://slimages.macysassets.com/is/image/MCY/products/1/optimized/9220501_fpx.tif?op_sharpen=1&wid=500&hei=613&fit=fit,1&$filtersm$'),
(2, 'Pants', 'https://images.timberland.com/is/image/timberland/A1OF4590-HERO?$PDP-FULL-IMAGE$'),
(2, 'Jackets & Coats', 'https://dtpmhvbsmffsz.cloudfront.net/posts/2017/05/23/592446f5b4188ec1d9003e58/m_592446f5b4188ec1d9003e59.jpg'),
(2, 'Shorts', 'https://images.nike.com/is/image/DotCom/BV2770_293?$NIKE_PWP_GRAY$&wid=420&hei=420'),
(2, 'Shirts', 'https://slimages.macysassets.com/is/image/MCY/products/6/optimized/9591496_fpx.tif?op_sharpen=1&wid=500&hei=613&fit=fit,1&$filtersm$'),
(2, 'Jeans', 'https://target.scene7.com/is/image/Target/GUEST_9129f49e-9e2a-4d43-b5da-cb990507b177?wid=488&hei=488&fmt=pjpeg'),
(2, 'Swimwear', 'https://slimages.macysassets.com/is/image/MCY/products/9/optimized/2740499_fpx.tif?op_sharpen=1&wid=500&hei=613&fit=fit,1&$filtersm$'),
(2, 'Hoodies & Sweatshirts', 'https://ak1.ostkcdn.com/images/products/is/images/direct/55809b1df3bf7dc47a53e0c8b52e0776b0e09532/Under-Armour-Mens-Sweater-Black-Size-XL-Textured-Pullover-Hooded.jpg?imwidth=400&impolicy=medium'),
(2, 'Sportswear', 'https://slimages.macysassets.com/is/image/MCY/products/8/optimized/15655508_fpx.tif?op_sharpen=1&wid=500&hei=613&fit=fit,1&$filtersm$'),
(3, 'Face', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-img.instyle.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F684xflex%2Fpublic%2Fimages%2F2018%2F04%2F042318-foundation-lead.jpg%3Fitok%3DA0rU78H2&w=450&c=sc&poi=face&q=85'),
(3, 'Eyes', 'https://www.narscosmetics.com/dw/image/v2/BBSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dwfc56d65a/hi-res/0607845013556.jpg?sw=375&sh=375&sm=fit'),
(3, 'Lips', 'https://ysms.akamaized.net/Assets/18/376/l_p0108837618.jpg'),
(3, 'Nails', 'https://target.scene7.com/is/image/Target/GUEST_117b1f4d-758d-411a-8e9d-ef3e435bc5d2'),
(3, 'Bath & Body Care', 'https://cdn.accentuate.io/76171461/10644515291171/Beekman_1802_banner_mobile-004-v1569113362496.jpg?500x293'),
(3, 'Hair', 'https://s1.thcdn.com/widgets/95-en/18/Hair-Care-05-032518.jpg'),
(3, 'Brushes & Tools', 'https://cdn.shopify.com/s/files/1/1067/9720/products/best_hair_brush_set_marble_rose_gold_paddle_hairbrush_barrel_brush_gift_box_1000_new_1200x630.jpg?v=1580466777'),
(4, 'Bags', 'https://cdn.shopify.com/s/files/1/2523/1254/products/PU_Leather_Circle_Round_Purses_Crossbody_Bags_For_Summer_18_59d7c67f-c83c-495f-bb7a-3416b8954448_500x.jpg?v=1587659834'),
(4, 'Belts', 'https://sewguide.com/wp-content/uploads/2018/08/belt-123.jpg'),
(4, 'Jewelry', 'https://i.pinimg.com/originals/de/b6/dc/deb6dc27899d59a7ceff27371ee11280.jpg'),
(4, 'Hair Accessories', 'https://img1.cfcdn.club/a7/c7/a7ce5fd395fc7af6f299836c6fb591c7_350x350.jpg'),
(4, 'Sunglasses', 'https://www.chloe.com/46/46689674KX_17_f.jpg'),
(4, 'Gloves', 'https://cdn11.bigcommerce.com/s-sn4d4efuta/images/stencil/337x337/products/25927/136500/40-Winter-Gloves-Faux-Suede-Full-Finger-Gloves-Women-Thicken-Warm-Mittens-Female-Elegant-Wrist__49173.1574214557.jpg?c=1'),
(4, 'Scarves', 'https://avvenice.com/51775-large_default/hermes-vintage-memoire-d-hermes-silk-scarf-white-multi-silk-foulard-luxury-high-quality.jpg'),
(4, 'Hats & Caps', 'https://i2.wp.com/ae01.alicdn.com/kf/HTB1vyvMDQyWBuNjy0Fpq6yssXXad/SUOGRY-Wide-Brim-Autumn-Female-font-b-Fashion-b-font-Top-Jazz-Cap-Winter-font-b.jpg?h=300&quality=70'),
(4, 'Wallets & Coin purses', 'https://sc02.alicdn.com/kf/HTB1AY6JaojrK1RkHFNRq6ySvpXaJ/Guangzhou-genuine-leather-small-women-purse-wallet.jpg_350x350.jpg');

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
('Pink'),
('Gray'),
('Brown'),
('Orange'),
('Blue'),
('Pink'), 
('Nude'), 
('Ivory');

INSERT INTO products
    (product_name, brand_id, store_id, category_id, product_price, material_id, color_id, product_description, product_type, quantity)
VALUES 
('Milan Leather Backpack', 1, 1, 4, 200.00, 5 , 1, 'Small leather backpack. Made in Peru.', 28, 5),

('Milan Mini Backpack', 1, 1, 4, 150.00, 5, 13, 'Mini leather backpack. Made in Peru.', 28, 5),

('Fanny Belt Bag', 1, 1, 4, 295.00, 5, 1, 'Fanny belt bag made for a traveler.', 28, 6),

('Leather Handbag', 1, 1, 4, 200.00, 5, 9, 'A bag perfect for everything', 28, 7),

('Joaquina Top', 2, 1 , 1 , 225.00, 7, 4, 'High neck with ribbon neck detail, ideal to wear with jeans and skirts for a sophisticated but casual look', 1, 10),

('Zena Top', 2, 1 , 1, 265.00, 8, 7, 'Hand-loomed long sleeve asymmetrical sweater knit', 1, 9),

('Onyx Dress', 2, 1, 1, 300.00, 8, 4, 'A perfect classic go-to dress for the transitional weather', 3, 10), 

('Moringa Face Oil', 3, 1, 3, 32.95, 1, 1, 'Reduces visible signs of aging, acne scars, psoriasis, and eczema', 21, 4 ),

('Moringa Rose Cream', 3, 1, 3, 39.95, 1, 1, 'This formula offers rich hydration and intensive skin regeneration', 21, 4), 

('Roama Skirt', 2, 1, 1, 130.00, 8, 14, 'Classic go-to pencil mid-length skirt with double slits', 5, 5 ), 

('Bucket Bag', null, 3, 4, 2000.00, 5, 1, 'Bucket bag with large woven motif', 28, 7), 

('Light Sable Printed Dress', null, 3, 1, 3300.00, 6, 11, 'Light sable printed dress with collar.', 3, 3 ), 

('Pascua Skirt', 2, 1,1, 280.00, 8, 1, 'Long skirt, double slit, hand-loom Alpaca skirt.', 5, 5);





INSERT INTO sizes
    (product_id, product_size)
VALUES
    (1, '22cm x 25cm x 10cm'),
    (2, '17cm x 20cm x 9cm'),
    (3, '37cm x 64cm'),
    (4, '37cm x 64cm' ), 
    (5, 'Medium'),
    (6, 'Small'),
    (7, 'Small'), 
    (8, 'One Size'),
    (9, 'One size'),
    (10, 'Medium'), 
    (11, '23cm x 14cm x 17.5'), 
    (11, 'Medium'), 
    (12, 'Small'),
    (13, 'Medium');


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
-- FROM checkoutCart;


