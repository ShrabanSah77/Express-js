/*

Register
login
forget password
reset password
change passwrod
verify token
change status of user
delete user
list users
update user
update my profile
get one user

*/

Router.get("/", secure(["admin"]), (req, res, next) => {

});

Router.post("/login", (req, res, next) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) throw new Error("Email or password is missing");
        if (email === "shrabanshah77@gmail.com")
    }
});


