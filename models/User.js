const { Schema, model } = require("mongoose");
const validator = require("validator");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, "username being used."],
      required: [true, "username is needed"],
      trim: true,
    },
    email: {
      type: String,
      unique: [true, "email is being used"],
      required: [true, "email is needed"],
      validate: [validator.isEmail, "Please enter valid email address"],
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const User = model("User", UserSchema);

module.exports = User;
