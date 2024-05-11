const checkRole = (userRole, sysRole) =>
  userRole.some((item) => sysRole.includes(item));

const mw = (sysRole) => {
  return (req, res, next) => {
    const { role } = req.headers;
    const result = checkRole([role], sysRole);
    if (!result) res.status(400).json({ msg: "Unauthorized User" });
    next();
  };
};

module.exports = { checkRole, mw };
