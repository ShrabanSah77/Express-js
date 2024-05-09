const { checkRole, verifyToken } = require("./token");

const secure = (sysRole) => {
  return (req, res, next) => {
    try {
      const { access_token } = req.headers;
      // check the token is valid or not
      if (!access_token) throw new Error("Token is missing");
      // check the token is valid or not
      const isValid = verifyToken(access_token);
      const { data } = isValid;
      const validRole = checkRole({ sysRole, userRole: data?.roles || [] });
      if (!validRole) throw new Error("User unauthorized");
      next();
    } catch (e) {
      next(e);
    }
  };
};

module.exports = { secure };
