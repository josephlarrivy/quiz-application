const express = require('express');
const { connectToDb } = require('./db')
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(express.json())
app.use('/users', userRoutes);

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log('app listening on port 3000')
    })
  }
})


module.exports = app