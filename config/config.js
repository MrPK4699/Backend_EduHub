require('dotenv').config();

module.exports ={
    MongoUrl: process.env.MONGODB_URI,
    jwtSecret : process.env.JWT_SECRET
}