const { checkRole, verifyToken } = require("./token");
const userModel = require("../modules/users/user.model");

const secure = (sysRole = []) => {
  return async (req, res, next) => {
    try {
      const { access_token } = req.headers;
      // what to do if no token
      if (!access_token) throw new Error("Token is missing");
      // check the token is valid or not
      const isValid = verifyToken(access_token);
      // token expired??
      if (!isValid) throw new Error("Token expired");
      res.json({ isValid });
      const { data } = isValid;
      // Check user email with database
      const userInfo = await userModel.findOne({
        email: data?.email,
        isActive: true,
        isEmailVarified: true,
      });
      if (!userInfo) throw new Error("User not found");
      // const data = isValid.data
      // RBAC (Role-Based Access Control)
      // RBAC VS PBAC VS ABAC
      const validRole = checkRole({ sysRole, userRole: userInfo?.roles || [] });
      if (!validRole) throw new Error("User unauthorized");
      req.currentUser = userInfo?._id;
      // req.bod.createdBy = userInfo?._id;
      next();
    } catch (e) {
      next(e);
    }
  };
};

module.exports = { secure };
