const express = require('express');
const { connectToDb } = require('./db')

const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const tagRoutes = require('./routes/tagRoutes')
const questionRoutes = require('./routes/questionRoutes')
const questionTagRoutes = require('./routes/questionTagRoutes')

const app = express()
app.use(express.json())


/////////////////// routes //////////////////
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes)
app.use('/tags', tagRoutes)
app.use('/questions', questionRoutes)
app.use('/questiontags', questionTagRoutes)


//////////// starting server ///////////
connectToDb((err) => {
  if (!err) {
    app.listen(3001, () => {
      console.log('app listening on port 3001')
    })
  }
})


module.exports = app