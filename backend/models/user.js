const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    surname: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  }, { timestamps: true, versionKey: false }
);

const model = mongoose.model("user", schema);

module.exports = model;