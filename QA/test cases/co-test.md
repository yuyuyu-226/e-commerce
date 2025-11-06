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
