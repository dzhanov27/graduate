const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    orders: [{ type: Types.ObjectId, ref: 'Order' }],
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
