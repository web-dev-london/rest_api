This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Clone the repository:

```bash
git clone https://github.com/your-username/inventory-management-api.git
cd inventory-management-api
```

To get started, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Set up .env file to configure your database.

```bash
cp  .env
```

Connect to your database:

```bash
npx prisma db push
# or
npx prisma migrate dev --name init
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Next Steps

    Use tool like Postman or Insomnia to test the endpoints.

## Inventory Management API

An Inventory Management API can be useful in business applications where you need to keep track of product stock, orders, and supplier information.
• Endpoints:

    •	Inventory Item Endpoints:
    •	POST /api/inventory/items: Add a new inventory item.
    •	GET /api/inventory/items: List all inventory items.
    •	GET /api/inventory/items/[id]: Retrieve a specific inventory item by ID.
    •	PUT /api/inventory/items: Update an inventory item by ID.
    •	DELETE /api/inventory/items: Delete an inventory item by ID.
    •	Order Endpoints:
    •	POST /api/inventory/orders: Create a new order.
    •	GET /api/inventory/orders: List all orders.
    •	GET /api/inventory/orders/[id]: Retrieve a specific order by ID.
    • PUT /api/inventory/orders: Update an order by ID.
    • DELETE /api/inventory/orders: Delete an order by ID.

-   **Useful For:** Warehouse management, small businesses, or point-of-sale systems.

# Endpoints Documentation

## Endpoints Summary

1. **POST /api/inventory/items**

    - **Description:** Adds a new inventory item to the database.
    - **Request Body:**
    - name (string, required): Name of the item.
    - quantity (number, default 0): Quantity of the item.
    - price (number, required): Price of the item.
    - supplier (string, optional): Supplier&apos;s name.

<hr>

2. **GET /api/inventory/items**

    - **Description:** Retrieves a list of all inventory items with optional query parameters for pagination, sorting, filtering, and searching.

    - **Query Parameters:**
    - search (string, optional): Search by item name.
    - sort (string, optional): Field to sort by (e.g., name, quantity, price).
    - order (string, optional): Sort direction (asc or desc).
    - minQuantity (number, optional): Filter items with a quantity greater than or equal to this value.
    - maxQuantity (number, optional): Filter items with a quantity less than or equal to this value.
    - page (number, default 1): Page number for pagination.
    - limit (number, default 10): Number of items per page.

<hr>

3. **GET /api/inventory/items/:id**

    - **Description:** Retrieves a single inventory item by its ID.
    - **URL Parameters:**
    - id (number, required): ID of the inventory item to retrieve.

<hr>

4. **PUT /api/inventory/items/:id**

    - **Description:** Updates details of a specific inventory item.

    - **URL Parameters:**
        - id (number, required): ID of the inventory item to update.
        - **Request Body:** Fields to be updated (e.g., quantity, price, name, or supplier).

<hr>

5. **DELETE /api/inventory/items/:id**

    - **Description:** Deletes an inventory item by its ID.
    - **URL Parameters:**
    - id (number, required): ID of the inventory item to delete.

<hr>

6. **POST /api/inventory/orders**

    - **Description:** Creates a new order associated with an inventory item.
    - **Request Body:**
    - inventoryItemId (number, required): ID of the inventory item being ordered.
    - quantity (number, required): Quantity of the item being ordered.

<hr>

7. **GET /api/inventory/orders**

    - **Description:** Retrieves a list of all orders with optional query parameters for pagination, sorting, filtering, and searching.

    - **Query Parameters:**
    - search (string, optional): Search by item name.
    - sort (string, optional): Field to sort by (e.g., createdAt, quantity).
    - order (string, optional): Sort direction (asc or desc).
    - minQuantity (number, optional): Filter orders with a quantity greater than or equal to this value.
    - maxQuantity (number, optional): Filter orders with a quantity less than or equal to this value.
    - page (number, default 1): Page number for pagination.
    - limit (number, default 10): Number of items per page.

<hr>

8. **GET /api/inventory/orders/:id**

    - **Description:** Retrieves a single order by its ID.
    - **URL Parameters:**
    - id (number, required): ID of the order to retrieve.

<hr>

9. **PUT /api/inventory/orders/:id**

    - **Description:** Updates a specific order&apos;s details.
    - **URL Parameters:**
    - id (number, required): ID of the order to update.
    - **Request Body:** Fields to be updated (e.g., quantity).

<hr>

## Example Requests

    1.	Get paginated and sorted list of items
    •	GET /api/inventory/items?page=2&limit=5&sort=name&order=asc
    2.	Get filtered items within quantity range and specific search
    •	GET /api/inventory/items?minQuantity=10&maxQuantity=50&search=Widget
    3.	Get orders sorted by creation date
    •	GET /api/inventory/orders?sort=createdAt&order=desc&page=1&limit=10

    4. Get paginated and sorted list of orders
     • GET /api/inventory/orders?page=2&limit=5&sort=createdAt&order=asc
    5. Get filtered orders within quantity range and specific search
    • GET /api/inventory/orders?minQuantity=10&maxQuantity=50&search=Widget
    6. Get orders sorted by creation date
    • GET /api/inventory/orders?sort=createdAt&order=desc&page=1&limit=10

## Query Parameters

| Parameter   |                Description                |              Example |
| ----------- | :---------------------------------------: | -------------------: |
| page        |         Specifies the page number         |               page=2 |
| limit       |         Number of items per page          |             limit=10 |
| sort        |  Field to sort by(e.g.,price,createdAt)   |           sort=price |
| order       |          Sort order,asc or desc           |            order=asc |
| minQuantity |     Minimum quantity filter for items     |       minQuantity=10 |
| maxQuantity |     Maximum quantity filter for items     |       maxQuantity=50 |
| search      |            Search by itme name            |        search=Widget |
| itemId      |     Filter orders by specific item ID     |             itemId=1 |
| startDate   | Start date filter for orders (YYYY-MM-DD) | startDate=2022-01-01 |
| endDate     |  End date filter for orders (YYYY-MM-DD)  |   endDate=2022-01-31 |
