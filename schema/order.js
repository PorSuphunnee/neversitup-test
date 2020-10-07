const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    customer_id: String,
    status: { type: String, default: 'order' }, //order, payment,deliver,done,cancel
    detail : Array,
    delivery_at: Date,
}, { timestamps: true, versionKey: false })

const OrderModel = mongoose.model('order', orderSchema)

module.exports = OrderModel

