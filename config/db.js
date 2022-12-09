require('dotenv').config({ path: '.env' })

const { default: mongoose } = require("mongoose");

const database = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    console.log('Database connected!')
  } catch (error) {
    console.log('Error connected database!')
    console.log("🚀 ~ file: db.js:9 ~ connectDB ~ error", error)
    process.exit(1)
  }
}

module.exports = database