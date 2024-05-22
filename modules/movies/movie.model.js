const { Schema, model } = require("mongoose");
// schema
const movieSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: {type: String, required: true},
    duration: { type: String, required: true },
    synopsis: { type: String },
    poster: { type: String, required: true },
    releaseDate: { type: Data, required: true, default: Date.now },
    endDate: { type: Data, required: true, default: Date.now },
    seats: { type: Number, required: true, default: 0 },
    // TODO (reference with User)
    // createdBy: {}
  },

  {
    timestamps: true,
  }

);

module.exports = model("Movie", movieSchema);
