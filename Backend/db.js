const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/vetcare-360';
const DB_NAME = 'vetcare-360';

const connectDB = async () => {
  try {
    const dbURI = MONGODB_URI || `mongodb://127.0.0.1:27017/${DB_NAME}`;

    const conn = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

module.exports = connectDB;