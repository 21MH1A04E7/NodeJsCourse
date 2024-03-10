// Importing mongoose
const mongoose = require('mongoose');
require('dotenv').config();
const MongoURL = process.env.MOGOLOCAURL // The URL of the database (after 27017 -> database_name)

// Database connection
mongoose.connect(MongoURL);

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;

// Define the listeners for the database
// Event listeners keywords
db.on('connected', () => {
    console.log('Database connected');
});

db.on('error', (err) => {
    console.error('Database connection error:', err);
});

db.once('disconnected', () => {
    console.log('Database disconnected');
});

// Export the db connection
module.exports = db;
