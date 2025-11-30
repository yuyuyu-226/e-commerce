## 4. Checkout Page

| Test Case ID | Test Description                           | Steps                                | Expected Result                                          | Status | Result | Notes |
| ------------ | ------------------------------------------ | ------------------------------------ | -------------------------------------------------------- | ------ | ------ | ----- |
| CO-01        | Verify cart summary displays correct items | Go to Checkout                       | All added products with correct price and quantity shown |    Complete    |    Partial    |    "Add to Cart" redirects to order page with correct price and quantity. Cart functionality is an out-of scope feature |
| CO-02        | Verify user can update quantity            | Change item quantity                 | Cart total updates accordingly                           |    Complete    |    Partial    |     Quantity can be updated on order form  |
| CO-03        | Verify removal of product                  | Click “Remove” icon                  | Item is removed and total updates                        |    Incomplete    |    N/A    |   Cart functionality is an is an out-of scope feature |
| CO-04        | Verify shipping details form validation    | Leave required fields empty → Submit | Validation messages appear                               |    Complete    |    Pass    |    Order cannot be placed without shipping address as expected   |
| CO-05        | Verify successful order placement          | Fill all fields → Confirm order      | Order success page displayed with order number           |    Complete    |    Partial    |    Order success is displayed as expected but without order number   |
| CO-06        | Verify payment gateway redirection         | Choose payment method → Pay          | Redirects to correct payment page                        |    Complete    |    Partial    |    Mockup Payment   |
| CO-07        | Verify email confirmation sent             | Complete purchase                    | Confirmation email received                              |     Incomplete   |     N/A   |    Out-of-scope Feature  |

**Last Updated:** November 21, 2025


