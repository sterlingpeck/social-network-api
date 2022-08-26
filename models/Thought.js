const { Schema, model, Types } = require("mongoose");
const { DateTime } = require("luxon");

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: "string",
      required: [true, "Input is required"],
      maxLength: [420, "Must be fewer than 420 characters."],
    },
    username: {
      type: "string",
      required: [true, "Username is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => createdAtVal.toLocaleString(DateTime.DATE_HUGE),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: "string",
      required: [true, "Input is required."],
      maxLength: [420, "Must be fewer than 420 characters."],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => createdAtVal.toLocaleString(DateTime.DATE_HUGE),
    },
    username: {
      type: "string",
      required: [true, "Username is required."],
    },
    userId: {
      type: "string",
      required: [true, "ID is required."],
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

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
