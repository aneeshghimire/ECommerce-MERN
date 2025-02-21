const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: { type: Number, required: true, min: 1, default: 1 }
        }
    ],
    totalPrice: { type: Number, required: true, default: 0 }, // Cart total price
    updatedAt: { type: Date, default: Date.now }
});

// Auto-update `updatedAt` before saving
CartSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("Cart", CartSchema);
