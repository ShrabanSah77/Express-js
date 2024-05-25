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

const list = async ({ page = 1, limit = 10 }) => {
  return await userModel.find();
};

const updateById = (id, payload) => {
  return userModel.findOneAndUpdate({ _id: id }, payload, { new: true });
};

const removeById = (id) => {
  return userModel.deleteOne({ _id: id });
};

const generateEmailToken = async (payload) => {
  const { email } = payload;
  const user = await userModel.findOne({ email, isActive: true });
  if (!user) throw new Error("User not found");
  const isVerified = user?.isEmailVarified;
  if (!isVerified) {
    const otp = generateOtp();
    const updatedUser = await userModel.updateOne({ _id: user?._id }, { otp });
    if (!updatedUser) throw new Error("Something went wrong");
    console.log({ otp });
    // eventEmitter.emit("emailVerification", email);
  }
  return true;
};

const verifyEmailToken = async (payload) => {
  const { email, token } = payload;
  const user = await userModel.findOne({ email, isActive: true });
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
  console.log({ payload });
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

const changePassword = async (id, payload) => {
  const { oldPassword, newPassword } = payload;
  // Get old password from the user
  const user = await userModel
    .findOne({
      _id: id,
      isActive: true,
      isEmailVarified: true,
    })
    .select("+password");
  if (!user) throw new Error("User not found");
  // compare that password to the database
  const isValidPw = compareHash(user?.password, oldPassword);
  if (!isValidPw) throw new Error("Password not matched");
  // convert newPassword to hashPassword
  const data = { password: genHash(newPassword) };
  // store that hashPassword
  return userModel.updateOne({ _id: id }, data);
};

const resetPassword = async (id, newPassword) => {
  // user exist??
  const user = await userModel.findOne({ _id: id });
  if (!user) throw new Error("User not Found");
  // newPassword hash
  const hashPw = genHash(newPassword);
  // user update
  return userModel.updateOne({ _id: id }, { password: hashPw });
};

const forgetPasswordTokenGen = async (payload) => {
  const { email } = payload;
  // find the user
  const user = await userModel.findOne({
    email,
    isActive: true,
    isEmailVarified: true,
  });
  if (!user) throw new Error("User not found");
  // Generate the token
  const otp = generateOtp();
  // store the token in the database.
  const updatedUser = await userModel.updateOne({ email }, { otp });
  if (!updatedUser) throw new Error("Something went wrong");
  //send the token in the email.
  eventEmitter.emit("emailVerification", email, otp);
  return true;
};
const forgetPasswordPassChange = async (payload) => {
  const { email, otp, newPassword } = payload;
  // Find the user
  const user = await userModel.findOne({
    email,
    isActive: true,
    isEmailVarified: true,
  });
  if (!user) throw new Error("User not found");
  if (otp !== user?.otp) throw new Error("OTP mismatch");
  const updateUser = await userModel.updateOne(
    { email },
    { password: hashPw, otp: "" }
  );
  if (!updateUser) throw new Error("Something went wrong");
  return true;
};

module.exports = {
  blockUser,
  changePassword,
  resetPassword,
  forgetPasswordTokenGen,
  forgetPasswordPassChange,
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
