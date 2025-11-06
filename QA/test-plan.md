# QA TEST CASES – E-COMMERCE WEBSITE

---

## 1. Authentication – Sign-Up / Login

| Test Case ID | Test Description                               | Steps                                             | Expected Result                                         | Status |
| ------------ | ---------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------- | ------ |
| AUTH-01      | Verify user can sign up with valid credentials | Go to Sign-Up page → Enter valid details → Submit | Account is created and confirmation email sent          |        |
| AUTH-02      | Verify error on duplicate email registration   | Enter an existing email → Submit                  | Error message “Email already exists” displayed          |        |
| AUTH-03      | Verify password validation rules               | Enter password shorter than 8 characters → Submit | “Password too short” validation message shown           |        |
| AUTH-04      | Verify login with valid credentials            | Enter registered email & password → Submit        | User successfully logs in and is redirected to homepage |        |
| AUTH-05      | Verify error for invalid login                 | Enter wrong password → Submit                     | “Invalid email or password” message shown               |        |
| AUTH-06      | Verify “Remember Me” functionality             | Check “Remember Me” → Login → Reopen browser      | User remains logged in                                  |        |
| AUTH-07      | Verify logout functionality                    | Click “Logout”                                    | User is logged out and session cleared                  |        |

---

## 2. Product List Page

| Test Case ID | Test Description                  | Steps                         | Expected Result                            | Status |
| ------------ | --------------------------------- | ----------------------------- | ------------------------------------------ | ------ |
| PLP-01       | Verify all products are displayed | Navigate to Product List page | Product cards load with image, name, price |        |
| PLP-02       | Verify pagination works           | Scroll or click next page     | New set of products load correctly         |        |
| PLP-03       | Verify sorting by price           | Select “Price: Low to High”   | Products reorder accordingly               |        |
| PLP-04       | Verify filtering by category      | Choose a category filter      | Only matching products are shown           |        |
| PLP-05       | Verify search functionality       | Enter keyword in search bar   | Matching products displayed                |        |
| PLP-06       | Verify product quick view         | Hover/click quick view button | Product preview modal opens                |        |

---

## 3. Product Details Page

| Test Case ID | Test Description                            | Steps                         | Expected Result                                   | Status |
| ------------ | ------------------------------------------- | ----------------------------- | ------------------------------------------------- | ------ |
| PDP-01       | Verify product details load correctly       | Click a product from list     | Product name, image, description, price displayed |        |
| PDP-02       | Verify image gallery navigation             | Click on thumbnails           | Main image updates accordingly                    |        |
| PDP-03       | Verify “Add to Cart” functionality          | Click “Add to Cart”           | Product added to cart and success message shown   |        |
| PDP-04       | Verify quantity selector                    | Change quantity → Add to Cart | Correct quantity added                            |        |
| PDP-05       | Verify related/recommended products section | Scroll down                   | Related products appear correctly                 |        |
| PDP-06       | Verify reviews and ratings display          | Check reviews section         | Ratings and comments load properly                |        |

---

## 4. Checkout Page

| Test Case ID | Test Description                           | Steps                                | Expected Result                                          | Status |
| ------------ | ------------------------------------------ | ------------------------------------ | -------------------------------------------------------- | ------ |
| CO-01        | Verify cart summary displays correct items | Go to Checkout                       | All added products with correct price and quantity shown |        |
| CO-02        | Verify user can update quantity            | Change item quantity                 | Cart total updates accordingly                           |        |
| CO-03        | Verify removal of product                  | Click “Remove” icon                  | Item is removed and total updates                        |        |
| CO-04        | Verify shipping details form validation    | Leave required fields empty → Submit | Validation messages appear                               |        |
| CO-05        | Verify successful order placement          | Fill all fields → Confirm order      | Order success page displayed with order number           |        |
| CO-06        | Verify payment gateway redirection         | Choose payment method → Pay          | Redirects to correct payment page                        |        |
| CO-07        | Verify email confirmation sent             | Complete purchase                    | Confirmation email received                              |        |

---

## 5. Admin Dashboard

| Test Case ID | Test Description             | Steps                         | Expected Result                             | Status |
| ------------ | ---------------------------- | ----------------------------- | ------------------------------------------- | ------ |
| ADM-01       | Verify admin login           | Enter valid admin credentials | Redirected to dashboard                     |        |
| ADM-02       | Verify product management    | Add new product → Save        | Product appears on Product List page        |        |
| ADM-03       | Verify edit product details  | Edit existing product         | Changes reflected on user side              |        |
| ADM-04       | Verify order management      | View Orders → Update status   | Order status updates successfully           |        |
| ADM-05       | Verify user management       | View user list → Block user   | User status updated to “Blocked”            |        |
| ADM-06       | Verify analytics/charts load | Open dashboard home           | Sales and performance charts load correctly |        |

---

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

---

## 7. UI & Responsiveness

| Test Case ID | Test Description                              | Steps                        | Expected Result                       | Status |
| ------------ | --------------------------------------------- | ---------------------------- | ------------------------------------- | ------ |
| UI-01        | Verify layout on desktop                      | Open site in desktop browser | Elements align correctly, no overflow |        |
| UI-02        | Verify layout on tablet                       | Resize window / use tablet   | Responsive grid adapts properly       |        |
| UI-03        | Verify layout on mobile                       | Open site on mobile device   | Navigation converts to hamburger menu |        |
| UI-04        | Verify image scaling                          | Resize browser window        | Images resize proportionally          |        |
| UI-05        | Verify button and text visibility             | Scroll through pages         | No clipped or overlapping text        |        |
| UI-06        | Verify dark/light mode toggle (if applicable) | Switch theme                 | Colors and contrast adjust correctly  |        |

---
