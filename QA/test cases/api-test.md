## 6. Backend APIs

| Test Case ID | Test Description                     | Endpoint                          | Expected Result                              | Status | Result | Notes |
| ------------ | ------------------------------------ | --------------------------------- | -------------------------------------------- | ------ | ------ | ----- |
| API-01       | Verify user login API                | `POST /api/auth/login`            | Returns 200 with JWT token                   |   Completed     |   Pass     |    User login API works as expected   |
| API-02       | Verify fetch products API            | `GET /api/products`               | Returns list of products with correct fields |    Completed    |    Pass    |   Fetching products API works as expected   |
| API-03       | Verify single product API            | `GET /api/products/:id`           | Returns product details JSON                 |    Completed    |     Pass   |     Single product API works as expected |
| API-04       | Verify add to cart API               | `POST /api/cart`                  | Returns updated cart object                  |    Incomplete    |   N/A     |      Out-of-scope feature |
| API-05       | Verify order placement API           | `POST /api/orders`                | Returns 201 with order ID                    |   Completed     |   Pass     |      Order placement API works as expected|
| API-06       | Verify admin add product API         | `POST /api/admin/products`        | Returns 201 and product created              |   Completed     |   Pass     |    Admin add product API works as expected  |
| API-07       | Verify unauthorized request handling | Call admin endpoint without token | Returns 401 Unauthorized                     |   Completed     |   Pass     |   Unauthorized request handling works as expected   |


