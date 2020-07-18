# Carry


Carry is a delivery service that allows users to place orders with some of their favorite retail stores that are within the NYC boroughs. Designed with the idea that customers should be able to get any items they need, we focus on delivering their necessities / wants from retail stores in delivery times ranging from 3hrs to end-of-day.

## Database Structure
![database_schema](./database-schema.png)

## Endpoints


- **Customer**

    | Method | Endpoint             | Description              | Body Data     |
    | ------ | -------------------- | ------------------------ | ------------- |
    | GET    |/customers/:id        | Get a customer by id     | N/A           |
    | POST   |/customers/register   | Register a new customer  | firstname, lastname, avatar_url, phone_number, email, address, city, state, zip_code, password |
    | PATCH  |/customers/edit/:id   | Customer edits info      | firstname, lastname, phone_number, email, address, city, state, zip_code, avatar_url, password |
    | DELETE |/customers/delete/:id | Customer deletes account | N/A           |

- **Store**

    | Method | Endpoint           | Description                | Body Data     |
    | ------ | ------------------ | -------------------------- | ------------- |
    | GET    | /store/:id         | Get a store by email       | N/A           |
    | POST   | /store/register    | Register a new store       | store_name, avatar_url, phone_number, email, address, city, state, zip_code, password |
    | PATCH  | /store/edit/:id    | Store edits profile info   | store_name, avatar_url, phone_number, email, address, city, state, zip_code, password |
    | DELETE | /store/delete/:id  | Store deletes account      | N/A           |

- **Courier**

    | Method | Endpoint           | Description                | Body Data     |
    | ------ | ------------------ | -------------------------- | ------------- |
    | GET    | /courier/:id       | Get a courier by email     | N/A           |
    | POST   | /courier/register  | Register a new courier     | firstname, lastname, avatar_url, phone_number, email, password, mode_of_transportation |
    | PATCH  | /courier/edit/:id  | Courier edits profile info | firstname, lastname, avatar_url, phone_number, email, password, mode_of_transportation |
    | DELETE | /courier/delete/:id| Courier deletes account    | N/A           |

- **Product**

    | Method  | Endpoint                                    | Description              | Body Data     |
    | ------- | ------------------------------------------- | ------------------------ | ------------- |
    | GET     | /product/:product_id                        | Get single product by id | N/A           |
    | GET ALL | /product/product_type/:product_type         | Get products by type     | N/A           |
    | GET ALL | /product/product_name/:product_name         | Get products by name     | N/A           |
    | GET ALL | /product/product_size/:product_size         | Get products by size     | N/A           |
    | GET ALL | /product/product_color/:product_color       | Get products by color    | N/A           |
    | GET ALL | /product/product_brand/:product_brand       | Get products by brand    | N/A           |
    | GET ALL | /product/product_category/:product_category | Get products by category | N/A           |

- **Order**

    | Method  | Endpoint                             | Description                 | Body Data     |
    | ------- | ------------------------------------ | --------------------------- | ------------- |
    | GET ALL | /orders/store_orders/:store_id       | Get orders by store id      | N/A           |
    | GET ALL | /orders/courier_orders/:courier_id   | Get orders by courier id    | N/A           |
    | GET ALL | /orders/customer_orders/:customer_id | Get orders by customer id   | N/A           |
    | GET ALL | /orders/items/:order_id              | Get order items by order id | N/A           |
    | POST    | /orders/add                          | Add a new order             | order_status, required_date, time_ordered, customer_id, store_id, courier_id, delivery_id, total |
    | PATCH   | /orders/update/:order_id             | Update an order             | order_status, required_date, time_ordered, customer_id, store_id, courier_id, delivery_id, total |
    | DELETE  | /orders/delete/:order_id             | Delete an order             | N/A           |
    
#   Local Setup
You must have installed Node.js and PostgreSQL in your computer.

You can check for these dependencies with node -v and psql -v. If your shell/terminal doesn't complain and you see version numbers you are good to go.

Clone this repo: 
git clone git@github.com/tbriany/Carry.git 

Install dependencies for the Node/Express Server (backend folder):
cd backend && npm install

cd frontend && npm install
Install dependencies the React App (frontend folder):

Create database and seed sample data while being in the server directory with:
psql -f .database/seed.sql
Make sure PostgreSQL is running!

To launch the Node/Express server, inside the backend folder run:
 npm run start:dev
 
To launch the React App, inside the frontend folder, and preferably in another terminal window run:
 npm start
 
A new browser tab should have been opened and the App should be running. If that is not the case check the terminals output for errors, if you are unable to troubleshoot the problem, I would be happy to address issues so open one
