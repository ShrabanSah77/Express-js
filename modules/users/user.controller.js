const event = require("events");
const userModel = require("./user.model");
const { genHash, compareHash } = require("../../utils/hash");
const { generateToken, generateOtp } = require("../../utils/token");
const { sendMail } = require("../../services/mailer");

const eventEmitter = new event.EventEmitter();
eventEmitter.addListener("signup", (email) =>
  sendMail({
    email,
    subject: "MovieMate Signup",
    htmlMsg: "<b>Thank you for joining Moviemate</b>",
  })
);

eventEmitter.addListener("emailVerification", (email, otp) =>
  sendMail({
    email,
    subject: "MovieMate Email Verification",
    htmlMsg: `<b>${otp}</b> is your OTP number`,
  })
);

const create = async (payload) => {
  const { email, password } = payload;
  const duplicateEmail = await userModel.findOne({ email });
  if (duplicateEmail) throw new Error("Email already in use");
  payload.password = genHash(password);
  const result = await userModel.create(payload);

  // call the nodemailer
  eventEmitter.emit("signup", email);
  return result;
};

const login = async (payload) => {
  const { email, password } = payload;
  // check for email
  const user = await userModel
    .findOne({ email, isActive: true })
    .select("+password");
  if (!user) throw new Error("User not found");
  const isVerified = user?.isEmailVarified;
  if (!isVerified) throw new Error("Email Verification is required");
  const isValidPw = compareHash(user?.password, password);
  if (!isValidPw) throw new Error("Email or password invalid");
  const tokenPayload = {
    name: user?.name,
    email: user?.email,
  };
  const token = generateToken(tokenPayload);
  if (!token) throw new Error("Something went wrong");
  return token;
};

const getById = (id) => {
  return userModel.findOne({ _id: id });
};

const list = async () => {
  return userModel.find();
};

const updateById = (id, payload) => {
  return userModel.updateOne({ _id: id }, payload);
};

const removeById = (id) => {
  return userModel.deleteOne({ _id: id });
};

const generateEmailToken = async (payload) => {
  const { email } = payload;
  const user = userModel.findOne({ email, isActive: true });
  if (!user) throw new Error("User not found");
  const isVerified = user?.isEmailVarified;
  if (!isVerified) {
    const otp = generateOtp();
    const updatedUser = await userModel.updateOne({ _id: user?._id }, { otp });
    if (!updatedUser) throw new Error("Something went wrong");
    console.log({ otp });
    eventEmitter.emit("emailVerification", email);
  }
  return true;
};

const verifyEmailToken = async (payload) => {
  const { email, token } = payload;
  const user = userModel.findOne({ email, isActive: true });
  if (!user) throw new Error("User not found");
  const isTokenValid = user?.otp === token;
  if (!isTokenValid) throw new Error("Token mismatch");
  const result = await userModel.updateOne(
    { _id: user?._id },
    { isEmailVarified: true, otp: "" }
  );
  if (!result) throw new Error("Something went wrong");
  return isTokenValid;
};

const blockUser = async (payload) => {
  const user = await userModel.findOne({ _id: payload });
  if (!user) throw new error("User not found");
  const statusPayload = {
    isActive: !user?.isActive,
  };
  const updatedUser = await userModel.updateOne(
    { _id: payload },
    statusPayload
  );
  if (!updatedUser) throw new Error("Something went Wrong");
  return true;
};

const getProfile = (_id) => {
  return userModel.findOne({ _id });
};

module.exports = {
  blockUser,
  login,
  create,
  getById,
  getProfile,
  list,
  updateById,
  removeById,
  generateEmailToken,
  verifyEmailToken,
};
