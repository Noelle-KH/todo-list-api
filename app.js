if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const routes = require('./routes')

const app = express()
require('./config/mongoose')
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
