const { Schema, model } = require("mongoose");

const { ObjectId } = Schema.Types;

const movieSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true },
    duration: { type: String, required: true },
    synopsis: { type: String },
    poster: { type: String, required: true },
    releaseDate: { type: Data, required: true, default: Date.now },
    endDate: { type: Data, required: true },
    seats: { type: Number, required: true, default: 0 },
    createdBy: { type: ObjectId, ref: "User" },
    updatedBy: { type: ObjectId, ref: "User"},
  },
  {
    timestamps: true,
  }
);

module.exports = model("Movie", movieSchema);
