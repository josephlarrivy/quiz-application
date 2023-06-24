const express = require('express');
const { connectToDb } = require('./db')

const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')

const app = express()
app.use(express.json())


/////////////////// routes //////////////////
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes)




//////////// starting server ///////////
connectToDb((err) => {
  if (!err) {
    app.listen(3001, () => {
      console.log('app listening on port 3001')
    })
  }
})


module.exports = app