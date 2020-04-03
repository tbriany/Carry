# Rush


Rush is a delivery service that allows users to place orders with some of their favorite stores that are within the NYC boroughs. Designed with the idea that customers should be able to get any items in a rush, not just food, we focus on delivering their daily necessities / wants ranging from 3hrs to end of day.

## Database Structure
![database_schema](./database-schema.png)

- **Customer**

    | Method | Endpoint            | Description             | Body Data     |
    | ------ | ------------------- | ----------------------- | ------------- |
    | GET    |/customers/:email    | Get 1 customer by email | N/A           |
    | POST   |/customers/register  | Register a new customer | Body Data     |
    | PATCH  |/customers/edit      | Customer edits info     | Body Data     |
    | DELETE |/customers/delete    | Customer deletes account| N/A           |

- **Store**

    | Method | Endpoint     | Description           | Body Data     |
    | ------ | ------------ | --------------------- | ------------- |
    | GET    |              |                       |               |
    | POST   |              |                       |               |
    | PATCH  |              |                       |               |
    | DELETE |              |                       |               |

- **Courier**

    | Method | Endpoint     | Description           | Body Data     |
    | ------ | ------------ | --------------------- | ------------- |
    | GET    |              |                       |               |
    | POST   |              |                       |               |
    | PATCH  |              |                       |               |
    | DELETE |              |                       |               |

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
