const JWT = require("jsonwebtoken");

const generateToken = (payload) =>
  JWT.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_DURATION,
    }
  );

const verifyTOken = (token) => JWT.verify(token, process.env.JWT_SECRET);

const checkRole = ({ sysROle, userROle }) =>
  userROle.some((role) => sysROle.includes(role));
module.exports = { generateToken, verifyTOken };
