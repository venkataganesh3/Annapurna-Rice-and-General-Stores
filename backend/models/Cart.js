// models/Cart.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: Array
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
