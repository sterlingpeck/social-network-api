const { Schema, model, Types } = require("mongoose");
const validator = require("validator");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, "That username is already being used."],
      required: [true, "Username is required."],
      trim: true,
    },
    email: {
      type: String,
      unique: [true, "That email is already being used."],
      required: [true, "An email is required."],
      validate: [validator.isEmail, "Please enter a valid email."],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
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
