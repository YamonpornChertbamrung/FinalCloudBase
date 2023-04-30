const express = require("express")
const mongodb = require("mongodb")
var ObjectID = require("mongodb").ObjectID

const router = express.Router()

router.get("/", async (req, res) => {
  const data = await loadPostsCollection()
  console.log("get tour info")
  res.send(await data.find({}).toArray())
})

router.get("/tour/:name", async function (req, res, next) {
  const data = await loadPostsCollection()

  const name = req.params.name
  console.log(name)

  res.send(await data.findOne({ name: name }))
})

router.get("/tour/:name/form", async function (req, res, next) {
  const data = await loadPostsCollection()

  const tour_name = req.params.name
  console.log(tour_name)
  console.log("into form")

  res.send(await data.findOne({ name: tour_name }))
})

const { MongoClient } = require("mongodb")
const uri = "mongodb+srv://tourdb:1234@cluster0.tvfr6n3.mongodb.net/PaaPai"

router.post("/users-create", async (req, res) => {
  const client = new MongoClient(uri)
  const bookingId = Math.floor(Math.random() * 1000000).toString()
  console.log(bookingId)
  await client.connect()
  await client.db("PaaPai").collection("myUser").insertOne({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    email: req.body.email,
    annotation: req.body.annotation,
    total_tourist: req.body.total_tourist,
    tour_name: req.body.tour_name,
    province: req.body.province,
    price: req.body.price,
    status: "",
    state: "",
    date: req.body.date,
    slip: "",
    bank: "",
    bookingId: bookingId,
  })
  await client.close()
  res.send(bookingId)
  // res.redirect("http://localhost:8080/#/form/" + bookingId + "/confirm")
})

router.get("/form/:id/confirm", async function (req, res, next) {
  const data = await loadUserCollection()

  // const ObjectId = require('mongodb').ObjectId;
  const bookingId = req.params.id

  res.send(await data.findOne({ bookingId: bookingId }))
})

router.get("/form/:id/payment", async function (req, res, next) {
  const data = await loadPaymentCollection()
  console.log("get payment info")
  const pay = await data.find({}).toArray()
  // res.send(await data.findOne({ bookingId : bookingId }))
  res.send(pay)
})

router.post("/user-update", async (req, res) => {
  const slip = req.body.slip
  const bookingId = req.body.bookingId
  const bank = req.body.bank
  const client = new MongoClient(uri)
  await client.connect()
  await client
    .db("PaaPai")
    .collection("myUser")
    .updateOne(
      { bookingId: bookingId },
      {
        $set: {
          bank: bank,
          slip: slip,
        },
      }
    )
  await client.close()
  res.send(bookingId)
})

router.get("/booking/:id/status", async function (req, res, next) {
  const data = await loadUserCollection()

  const bookingId = req.params.id

  res.send(await data.findOne({ bookingId: bookingId }))
})

router.get("/statusUser", async function (req, res, next) {
  const data = await loadUserCollection()
  res.send(await data.find({}).toArray())
})

router.post("/check/status", async function (req, res, next) {
  const bookingId = req.body.bookingId
  console.log(bookingId)

  res.send(bookingId)
})
router.get("/check/status/:id", async function (req, res, next) {
  const data = await loadUserCollection()
  const bookingId = req.params.id
  console.log(bookingId)

  res.send(await data.findOne({ bookingId: bookingId }))
})

// Admin
router.get("/admin", async (req, res) => {
  const dataAdmin = await loadUserCollection()
  console.log("get admin info")
  const user = await dataAdmin.find({}).toArray()
  res.status(201).send(user)
})

router.get("/admin/allTour", async (req, res) => {
  const dataTour = await loadPostsCollection()
  console.log("get tour info in admin")
  const user = await dataTour.find({}).toArray()
  res.status(201).send(user)
})

router.get("/admin/manage", async (req, res) => {
  const dataTour = await loadPostsCollection()
  console.log("manage tour")
  const user = await dataTour.find({}).toArray()
  res.status(201).send(user)
})

router.get("/admin/allTour/:tourName/detail", async (req, res) => {
  const dataTour = await loadUserCollection()
  const tour_name = req.params.tourName
  console.log(tour_name)
  const users = await dataTour.find({ tour_name: tour_name }).toArray()
  res.send(users)
})

router.get("/admin/checkPayment", async (req, res) => {
  const data = await loadUserCollection()
  console.log("admin checkPayment")
  const user = await data.find({}).toArray()
  res.status(201).send(user)
})

router.get("/admin/approve", async (req, res) => {
  const data = await loadUserCollection()
  console.log("admin approve")
  const user = await data.find({}).toArray()
  res.status(201).send(user)
})

router.get("/admin/reject", async (req, res) => {
  const data = await loadUserCollection()
  console.log("admin reject")
  const user = await data.find({}).toArray()
  res.status(201).send(user)
})

router.get("/admin/info/:id", async (req, res) => {
  const dataUser = await loadUserCollection()
  const userId = req.params.id
  console.log(userId)
  console.log("Detail user")
  let result = await dataUser.findOne({ _id: new mongodb.ObjectId(req.params.id) })
  res.send(result)
})

// Edit Tours
router.get("/edit/:id", async function (req, res, next) {
  const data = await loadPostsCollection()
  let result = await data.findOne({ _id: new mongodb.ObjectId(req.params.id) })
  res.send(result)
})

// Create Tours
router.get("/create/:name", async function (req, res, next) {
  const data = await loadPostsCollection()

  const name = req.params.name
  console.log(name)

  res.send(await data.findOne({ name: name }))
})

// Change Status to Reject
router.post("/toReject/:id", async (req, res) => {
  const dataUser = await loadUserCollection()
  const id = req.params.id
  console.log(id)
  await dataUser.updateOne(
    { _id: new mongodb.ObjectId(req.params.id) },
    {
      $set: {
        status: "false",
        state: "false",
      },
    }
  )
  res.status(200).send({})
})

// Change Status to Approve
router.post("/toApprove/:id", async (req, res) => {
  const dataUser = await loadUserCollection()
  const id = req.params.id
  console.log(id)
  await dataUser.updateOne(
    { _id: new mongodb.ObjectId(req.params.id) },
    {
      $set: {
        status: "true",
        state: "true",
      },
    }
  )
  res.status(200).send({})
})

router.get("/admin/slip/:id", async (req, res) => {
  const data = await loadUserCollection()
  const userId = req.params.id
  console.log(userId)
  console.log("Check Slip")
  let result = await data.findOne({ _id: new mongodb.ObjectId(req.params.id) })
  res.send(result)
})

router.post("/tours-create", async (req, res) => {
  const client = new MongoClient(uri)
  await client.connect()
  await client.db("PaaPai").collection("myTour").insertOne({
    name: req.body.name,
    province: req.body.province,
    price: req.body.price,
    img: req.body.img,
    detail_img: req.body.detail_img,
    detail: req.body.detail,
    schedule: req.body.schedule,
    max_tourist: req.body.max_tourist,
    date_first: req.body.date_first,
    date_second: req.body.date_second,
  })
  await client.close()
  res.redirect("http://localhost:8080/#/admin/manage")
})

// Delete Tour
router.delete("/delete/:id", async (req, res) => {
  const posts = await loadPostsCollection()
  await posts.deleteOne({ _id: new mongodb.ObjectId(req.params.id) })
  res.status(200).send({})
})

// Update Tour
router.post("/updateTour/:id", async (req, res) => {
  const Id = req.params.id
  console.log(Id)

  const data = await loadPostsCollection()
  await data.updateOne(
    { _id: new mongodb.ObjectId(req.params.id) },
    {
      $set: {
        name: req.body.name,
        province: req.body.province,
        price: req.body.price,
        img: req.body.img,
        detail_img: req.body.detail_img,
        detail: req.body.detail,
        schedule: req.body.schedule,
        max_tourist: req.body.max_tourist,
        date_first: req.body.date_first,
        date_second: req.body.date_second,
      },
    }
  )
  res.status(200).send({})
})

router.post("/admin/login", async (req, res) => {
  const data = await loadAdminCollection()
  const admin = await data.findOne({ username: req.body.username })
  console.log(admin)
  if (admin !== null) {
    if (admin.username === req.body.username && admin.password === req.body.password) {
      return res.send(admin)
    } else {
      return res.send("invalid")
    }
  } else {
    return res.send("invalid")
  }
})

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://tourdb:1234@cluster0.tvfr6n3.mongodb.net/test",
    {
      useNewUrlParser: true,
    }
  )

  return client.db("PaaPai").collection("myTour")
}

async function loadUserCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://tourdb:1234@cluster0.tvfr6n3.mongodb.net/test",
    {
      useNewUrlParser: true,
    }
  )

  return client.db("PaaPai").collection("myUser")
}

async function loadPaymentCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://tourdb:1234@cluster0.tvfr6n3.mongodb.net/test",
    {
      useNewUrlParser: true,
    }
  )

  return client.db("PaaPai").collection("payment")
}

async function loadAdminCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://tourdb:1234@cluster0.tvfr6n3.mongodb.net/test",
    {
      useNewUrlParser: true,
    }
  )

  return client.db("PaaPai").collection("admin")
}

exports.router = router
