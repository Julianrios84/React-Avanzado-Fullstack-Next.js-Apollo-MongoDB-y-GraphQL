require('dotenv').config({ path: 'development.env' })

const mongoose = require('mongoose');

const database = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO);
    console.log('Database connected!')
  } catch (error) {
    console.log('Error connected database!')
    console.log("🚀 ~ file: db.js:9 ~ connectDB ~ error", error)
    process.exit(1)
  }
}

module.exports = database