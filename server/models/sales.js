const mongoose = require(`mongoose`);

let salesSchema = new mongoose.Schema(
    {
        paypalPaymentID: { type: String, required: true },
        carID: { type: String, required: true },
        price: { type: Number, required: true },
        orderName: { type: String, required: true },
        orderEmail: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true }
    },
    {
        collection: `sales`
    }
);

module.exports = mongoose.model(`sales`, salesSchema);