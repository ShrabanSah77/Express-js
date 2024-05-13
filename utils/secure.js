const { checkRole, verifyToken } = require("./token");

const secure = (sysRole) => {
  return (req, res, next) => {
    try {
      const { access_token } = req.headers;
      // what to do if no token
      if (!access_token) throw new Error("Token is missing");
      // check the token is valid or not
      const isValid = verifyToken(access_token);
      // token expired??
      if (!isValid) throw new Error("Token expired");
      res.json({ isValid });
      const { data } = isValid; // const data = isValid.data
      // RBAC (Role-Based Access Control)
      const validRole = checkRole({ sysRole, userRole: data?.Roles || [] });
      if (!validRole) throw new Error("User unauthorized");
      next();
    } catch (e) {
      next(e);
    }
  };
};

module.exports = { secure };