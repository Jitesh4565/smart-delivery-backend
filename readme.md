# Smart Delivery Management Backend

This is the backend server for the Smart Delivery Management System. It handles:

* Delivery partner registration and updates
* Order creation and tracking
* Smart assignment of orders to delivery partners based on availability, area, and shift

## Tech Stack

* Node.js
* Express.js
* TypeScript
* MongoDB

## How to Run

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your Mongo URI:

```
MONGO_URI=your_mongo_uri
PORT=5000
```

4. Start the server:

```
npm run dev
```

The server runs at: `http://localhost:5000`

## API Base Path

All APIs start with `/api`

---

## Available API Endpoints

### 👤 Partner Management

* `GET /api/partners` – Get all delivery partners
* `POST /api/partners` – Create a new delivery partner
* `PUT /api/partners/:id` – Update an existing partner
* `DELETE /api/partners/:id` – Remove a partner

### 📦 Order Management

* `GET /api/orders` – Get all orders
* `POST /api/orders` – Create a new order
* `PUT /api/orders/:id/status` – Update order status (e.g. picked, delivered)

### ⚙️ Smart Assignment System

* `POST /api/assignments/run` – Run the assignment algorithm
* `GET /api/assignments/metrics` – Get assignment performance stats (success rate, total assigned, failures, etc.)

---

## Notes

* Max 3 orders can be assigned to a single delivery partner at a time
* Partner availability is based on status (`active`/`inactive`), load, shift, and area
* Orders can be `pending`, `assigned`, `picked`, or `delivered`

---


