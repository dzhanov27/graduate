const { Schema, model } = require('mongoose');

const cafeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    address: {
      type: String,
      required: true,
      minlength: 10,
    },
    phone: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dishes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Dish',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cafe = model('Cafe', cafeSchema);

module.exports = Cafe;
