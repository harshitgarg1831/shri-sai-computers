import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String }
});

const OrderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        items: [OrderItemSchema],
        totalAmount: { type: Number, required: true },
        status: { type: String, default: 'pending' },
        paymentMethod: { type: String, default: 'Cash on Delivery' },
        deliveryAddress: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
