const { Schema, model, Types } = require("mongoose");
const { DateTime } = require("luxon");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: "string",
      required: [true, "Input required."],
      maxLength: [420, "Must be fewer than 420 characters."],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => createdAtVal.toLocaleString(DateTime.DATE_HUGE),
    },
    username: {
      type: "string",
      required: [true, "Username required."],
    },
    userId: {
      type: "string",
      required: [true, "ID required."],
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
