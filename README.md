# Rush


Rush is a delivery service that allows users to place orders with some of their favorite stores that are within the NYC boroughs. Designed with the idea that customers should be able to get any items in a rush, not just food, we focus on delivering their daily necessities / wants ranging from 3hrs to end of day.

## Database Structure
![database_schema](./database-schema.png)

## Endpoints


- **Customer**

    | Method | Endpoint            | Description             | Body Data     |
    | ------ | ------------------- | ----------------------- | ------------- |
    | GET    |/customers/:id       | Get a customer by id    | N/A           |
    | POST   |/customers/register  | Register a new customer | Body Data     |
    | PATCH  |/customers/edit/:id  | Customer edits info     | Body Data     |
    | DELETE |/customers/delete/:id| Customer deletes account| N/A           |

- **Store**

    | Method | Endpoint         | Description              | Body Data     |
    | ------ | ---------------- | ------------------------ | ------------- |
    | GET    | /store/:id       | Get a store by email     | N/A           |
    | POST   | /store/register  | Register a new store     | Body Data     |
    | PATCH  | /store/edit/:id  | Store edits profile info | Body Data     |
    | DELETE | /store/delete/:id| Store deletes account    | N/A           |

- **Courier**

    | Method | Endpoint           | Description                | Body Data     |
    | ------ | ------------------ | -------------------------- | ------------- |
    | GET    | /courier/:id       | Get a courier by email     | N/A           |
    | POST   | /courier/register  | Register a new courier     | Body Data     |
    | PATCH  | /courier/edit/:id  | Courier edits profile info | Body Data     |
    | DELETE | /courier/delete/:id| Courier deletes account    | N/A           |

- **Product**

    | Method | Endpoint     | Description           | Body Data     |
    | ------ | ------------ | --------------------- | ------------- |
    | GET    |              |                       |               |
    | GET    |              |                       |               |
    | GET    |              |                       |               |
    | GET    |              |                       |               |
    | GET    |              |                       |               |
    | GET    |              |                       |               |
    | GET    |              |                       |               |
    | POST   |              |                       |               |
    | PATCH  |              |                       |               |
    | DELETE |              |                       |               |
