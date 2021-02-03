const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    is_completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    description: {
      type: String,
    },
    dishes: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = model('Order', orderSchema);

module.exports = Order;
