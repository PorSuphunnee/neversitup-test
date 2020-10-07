const express = require('express')
const app = express()
app.use(express.json())

const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect('mongodb://admin:12345678@localhost:27017?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const ProductModel = require('./schema/product')
const CustomerModel = require('./schema/customer')
const OrderModel = require('./schema/order')

// สามารถสมัครสมาชิกได้
app.post('/register', async (req, res) => {
  const payload = req.body
  const presave = new CustomerModel(payload)
  const result = await presave.save()
  res.send(result)
})

// มีระบบ Login
app.post('/login', async (req, res) => {
  const payload = req.body
  const result = await CustomerModel.findOne({ username: payload.username, password: payload.password })
  res.json(result)

})

app.post('/user/list', async (req, res) => {
  const payload = req.body
  const filter = {};

  if(payload.filter.firstname !== ""){
    filter['firstname'] = {$regex: `.*${payload.filter.firstname}.*`};
  }
  if(payload.filter.email !== ""){
    filter['email'] = {$regex: `.*${payload.filter.email}.*`};
  }
  const result = await CustomerModel.find(filter)
    .limit(payload.limit)
    .skip(payload.offset)
    .lean();
  const total = await CustomerModel.countDocuments(filter);
  res.json({
    rows: result || [], total: total || 0
  })

})

//เรียกดู Profile ของตัวเอง
app.get('/user/profile/:id', async (req, res) => {
    const {id} = req.params;
    const result = await CustomerModel.findOne({ _id: id })
    res.json(result)
})

//เรียกดู Order history ของตัวเอง
app.get('/user/order-history/:id', async (req, res) => {
  const {id} = req.params;
  const result = await OrderModel.find({customer_id:id},{})
  // const rows = await dim_line_bc_setting.find(filter)
  //   .limit(payload.limit)
  //   .skip(payload.offset)
  //   .lean();
  const total = await OrderModel.countDocuments({customer_id:id});
  res.json({
    rows: result || [], total: total || 0
  })
})

//สร้าง product
app.post('/product', async (req, res) => {
    const payload = req.body
    const presave = new ProductModel(payload)
    const result = await presave.save()
    res.send(result)
})

//เรียกดู Product ทั้งหมดที่มีในระบบ
app.post('/product/list', async (req, res) => {
    const filter = {
    }
    const result = await ProductModel.find()
    // const rows = await dim_line_bc_setting.find(filter)
    //   .limit(payload.limit)
    //   .skip(payload.offset)
    //   .lean();
    const total = await ProductModel.countDocuments();
    res.json({
        rows: result || [], total: total || 0
    })
})

//สามารถดูข้อมูลของแต่ละ Product ได้
app.get('/product/:id', async (req, res) => {
    const {id} = req.params;
    const result = await ProductModel.findOne({ _id: id })
    res.json(result)
})

app.delete('/product/:id', async (req, res) => {
  const { id } = req.params
  await ProductModel.findByIdAndDelete(id)
  res.status(204).end()
})

//สร้างรายการคำสั่งซื้อได้
app.post('/order', async (req, res) => {
    const payload = req.body
    const presave = new OrderModel(payload)
    const result = await presave.save()
    res.send(result)
})

//ยกเลิกคำสั่งซื้อ
app.put('/order/cancel/:id', async (req, res) => {
  const payload = req.body
  const { id } = req.params
  const product = await OrderModel.findByIdAndUpdate(id, { $set: payload })
  res.json(product)
})

//ดูรายละเอียดคำสั่งซื้อ
app.get('/order/:id', async (req, res) => {
  const {id} = req.params;
  const result = await OrderModel.findOne({ _id: id })
  res.json(result)
})

app.post('/order/list', async (req, res) => {
  const filter = {
  }
  const result = await OrderModel.find()
  // const rows = await dim_line_bc_setting.find(filter)
  //   .limit(payload.limit)
  //   .skip(payload.offset)
  //   .lean();
  const total = await OrderModel.countDocuments();
  res.json({
    rows: result || [], total: total || 0
  })
})

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})


//
// const express = require("express")
// const cors = require("cors")
//
// const server = express()
//
// import Product from "./order-menagement/order.router"
// // import Order from "./services/standard/line/auto_reply_keyword.router"
// // import Authentication from "./services/standard/line/auto_reply_default.router"
//
//
//
// server.use(cors())
// server.use(express.urlencoded({ limit : "50mb" , extended : true , strict : false }))
// server.use(express.json({ limit : "50mb" }))
//
// server.use("/authentication" , aaa)
// // server.use("/order" , Order)
// // server.use("/product" , Product)
// // server.use("/User" , user)
//
// export default server
//
