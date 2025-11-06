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
