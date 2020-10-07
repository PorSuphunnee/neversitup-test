const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    product_name: String,
    category: String,
    price: Number,
    remain: Number,
}, { timestamps: true, versionKey: false })

const ProductModel = mongoose.model('product', productSchema)

module.exports = ProductModel
