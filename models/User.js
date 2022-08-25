const { Schema, model, Types } = require("mongoose");
const validator = require("validator");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, "That username is already in use!"],
      required: [true, "A username is required!"],
      trim: true,
    },
    email: {
      type: String,
      unique: [true, "That email is already in use!"],
      required: [true, "An email address is required!"],
      validate: [validator.isEmail, "Please enter a valid email address!"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
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
