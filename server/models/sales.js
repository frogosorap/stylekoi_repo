const mongoose = require(`mongoose`)

let salesSchema = new mongoose.Schema(
   {
        paypalPaymentID: {type: String, required:true},
        carID: {type: String, required:true},
        price: {type: Number, required:true}
   },
   {
       collection: `sales`
   })

module.exports = mongoose.model(`sales`, salesSchema)