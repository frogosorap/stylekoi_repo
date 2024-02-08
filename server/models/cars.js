const mongoose = require(`mongoose`)

let carPhotosSchema = new mongoose.Schema(
    {
       filename:{type:String}
    })


let carsSchema = new mongoose.Schema(
    {
        model: {type: String, required:true},
        colour: {type: String, required:true},
        year: {type: Number, required:true},
        price: {type: Number, required:true},
        photos:[carPhotosSchema],
        sold: {type: Boolean, default:false}
    },
    {
       collection: `cars`
    })

module.exports = mongoose.model(`cars`, carsSchema)