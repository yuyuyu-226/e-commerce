## 1. Authentication – Sign-Up / Login

| Test Case ID | Test Description                               | Steps                                             | Expected Result                                         | Status     | Result | Notes |
|---------------|------------------------------------------------|---------------------------------------------------|---------------------------------------------------------|-------------|---------|-------|
| AUTH-01       | Verify user can sign up with valid credentials | Go to Sign-Up page → Enter valid details → Submit | Account is created and confirmation email sent | Complete |  Partial | Account created successfully, Email confirmation is an Out-of-Scope Feature |
| AUTH-02       | Verify error on duplicate email registration   | Enter an existing email → Submit | Error message “Email already exists” displayed | Complete |  Pass | Validation works correctly |
| AUTH-03       | Verify password validation rules               | Enter password shorter than 8 characters → Submit | “Password too short” validation message shown | Complete |  Pass | Error message displayed properly |
| AUTH-04       | Verify login with valid credentials            | Enter registered email & password → Submit | User successfully logs in and is redirected to homepage | Complete |  Pass | User redirected to dashboard |
| AUTH-05       | Verify error for invalid login                 | Enter wrong password → Submit | “Invalid email or password” message shown | Complete |  Pass | Error message appears as expected |
| AUTH-06       | Verify “Remember Me” functionality             | Check “Remember Me” → Login → Reopen browser | User remains logged in | Complete |  Partial | No "Remember Me" Button, but login token is kept for a certain time |
| AUTH-07       | Verify logout functionality                    | Click “Logout” | User is logged out and session cleared | Complete |  Partial | The logout button is the same button as the signup/login button, the UI did not change uppon logging in. Pressing the button while logged in makes it function as a logout button |

**Last Updated:** November 21, 2025



