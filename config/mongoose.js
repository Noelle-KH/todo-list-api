const mongoose = require('mongoose')

mongoose.set({ strictQuery: true })
mongoose.connect(process.env.MONGODB_URL)

const db = mongoose.connection

db.on('error', () => {
  console.log('Mongodb error.')
})

db.once('open', () => {
  console.log('Mongodb connected.')
})

module.exports = db
