const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerSchema = new Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  email: String,
  phone_number: String,
  address: String

})
const CustomerModel = mongoose.model('customer', customerSchema)
module.exports = CustomerModel


//
// const schema_product = new db.Product(
//     {
//         product_name: {type: String, default: null},
//         price: {type: String, default: null},
//         remain: {type: String, default: null},
//         created_at: {type: Date, default: new Date()},
//         updated_at: {type: Date, default: new Date()}
//     }, {versionKey: false});
// schema_customer.pre('save', function (next) {
//     this.created_at = new Date();
//     this.updated_at = new Date();
//     next();
// });
// const product = db.model("product", schema_product);
// module.exports = product
//
// const schema_order = new db.Product(
//     {
//         customer_id: {type: String, default: null},
//         order_at: {type: Date, default: new Date()},
//         delivery_at: {type: Date, default: new Date()},
//         created_at: {type: Date, default: new Date()},
//         updated_at: {type: Date, default: new Date()}
//     }, {versionKey: false});
// schema_order.pre('save', function (next) {
//     this.created_at = new Date();
//     this.updated_at = new Date();
//     next();
// });
// const order = db.model("order", schema_order);
// module.order = order
//
// const schema_order_detail = new db.Product(
//     {
//         order_id: {type: String, required: true},
//         product_id: {type: String, required: true},
//         total: {type: String, default: null},
//         discount: {type: String, default: null},
//         created_at: {type: Date, default: new Date()},
//         updated_at: {type: Date, default: new Date()}
//     }, {versionKey: false});
// schema_order.pre('save', function (next) {
//     this.created_at = new Date();
//     this.updated_at = new Date();
//     next();
// });
// const order_detail = db.model("order_detail", schema_order_detail);
// module.order_detail = order_detail