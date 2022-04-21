const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const postsRoutes = require('./routes/posts')

require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/auth',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", function () {
  app.listen(PORT, () => {
    console.log(`Server and DB is running on port ${PORT}`);
  });
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.get('/',(req, res) => {
  res.send("Hello Manit Connect Backend")
})
app.use('/auth', authRoutes)
app.use('/posts', postsRoutes)

