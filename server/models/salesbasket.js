const mongoose = require(`mongoose`);

let salesBasketSchema = new mongoose.Schema(
   {
        paypalPaymentID: { type: String, required: true },
        items: { type: Array, required: true },
        totalPrice: { type: Number, required: true }
   },
   {
       collection: `salesbasket`
   });

module.exports = mongoose.model(`SalesBasket`, salesBasketSchema);