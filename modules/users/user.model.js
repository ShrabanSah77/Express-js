const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    roles: [
      {
        type: String,
        enum: ["admin", "user"],
        default: "user",
        required: true,
      },
    ],
    image: {type: String},
    isEmailVarified: { type: Boolean, required: true, default: false },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
