# User Sign up

-database user record save
-nodemailer services module
-async await nodemailer services
-email from re.body, send welcome user email(event or async await)

# User Login

- input => req.body => email, password
- if email and password doesn't match => throw error
- output => jwt token

# User list API (admin)

- if user is admin, show list of user
- if user is not admin, throw unauthorized error
- how?? By using JWT Token; by sending jwt token
  through headers.

# Utils

- secure => verify JWT Token middleware
- token => generateToken, verifyToken, checkRole

# User Registration

- API endpoint (msg: User signup successfully(req.body))(/register)
- userController.register()
- register controller

  1. email, password check
  2. create bcrypt utility file (genHash, compareHash)
  3. payload.password = genHash (password)
  4. userModel.create(payload)
  5. email signup (email notification)

# user login

- API endpoint (/login)
- userController.login()
- login controller

  1. email exist; isActive: true
  2. check email verification of user
  3. email not verified, throw error
  4. compare password hash with user password
  5. if invalid, throw error
  6. return true

  - Email Token Generation
  - API (/generate-email-token)

  1. email exist; isActive: true
  2. use crypto util, to create otp (truly random otp)
  3. if not verified, generate otp
  4. Store the otp in the user database
  5. email that otp

  - Email Token Verification
  - API (/verify-email-token)

  1. email exist; isActive: true
  2. compare otp
  3. if verified, update user database with isEmailVerified: true, otp: ""
  4. else Token invalid

# User Email verification

- if email unverified, stop user
-

# user list
