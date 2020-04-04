# Carry


Carry is a delivery service that allows users to place orders with some of their favorite retail stores that are within the NYC boroughs. Designed with the idea that customers should be able to get any items they need, we focus on delivering their necessities / wants from retail stores in delivery times ranging from 3hrs to end-of-day.

## Database Structure
![database_schema](./database-schema.png)

## Endpoints


- **Customer**

    | Method | Endpoint             | Description              | Body Data     |
    | ------ | -------------------- | ------------------------ | ------------- |
    | GET    |/customers/:id        | Get a customer by id     | N/A           |
    | POST   |/customers/register   | Register a new customer  | Body Data     |
    | PATCH  |/customers/edit/:id   | Customer edits info      | Body Data     |
    | DELETE |/customers/delete/:id | Customer deletes account | N/A           |

- **Store**

    | Method | Endpoint           | Description                | Body Data     |
    | ------ | ------------------ | -------------------------- | ------------- |
    | GET    | /store/:id         | Get a store by email       | N/A           |
    | POST   | /store/register    | Register a new store       | Body Data     |
    | PATCH  | /store/edit/:id    | Store edits profile info   | Body Data     |
    | DELETE | /store/delete/:id  | Store deletes account      | N/A           |

- **Courier**

    | Method | Endpoint           | Description                | Body Data     |
    | ------ | ------------------ | -------------------------- | ------------- |
    | GET    | /courier/:id       | Get a courier by email     | N/A           |
    | POST   | /courier/register  | Register a new courier     | Body Data     |
    | PATCH  | /courier/edit/:id  | Courier edits profile info | Body Data     |
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
    | POST    | /orders/add                          | Add a new order             | Body Data     |
    | PATCH   | /orders/update/:order_id             | Update an order             | N/A           |
    | DELETE  | /orders/delete/:order_id             | Delete an order             | N/A           |