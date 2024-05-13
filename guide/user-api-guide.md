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

-secure => verify JWT Token middleware

- token => generateToken, verifyToken, checkRole
