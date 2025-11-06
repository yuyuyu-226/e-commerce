## 6. Backend APIs

| Test Case ID | Test Description                     | Endpoint                          | Expected Result                              | Status |
| ------------ | ------------------------------------ | --------------------------------- | -------------------------------------------- | ------ |
| API-01       | Verify user login API                | `POST /api/auth/login`            | Returns 200 with JWT token                   |        |
| API-02       | Verify fetch products API            | `GET /api/products`               | Returns list of products with correct fields |        |
| API-03       | Verify single product API            | `GET /api/products/:id`           | Returns product details JSON                 |        |
| API-04       | Verify add to cart API               | `POST /api/cart`                  | Returns updated cart object                  |        |
| API-05       | Verify order placement API           | `POST /api/orders`                | Returns 201 with order ID                    |        |
| API-06       | Verify admin add product API         | `POST /api/admin/products`        | Returns 201 and product created              |        |
| API-07       | Verify unauthorized request handling | Call admin endpoint without token | Returns 401 Unauthorized                     |        |
