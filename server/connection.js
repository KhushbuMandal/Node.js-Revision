const mongoose = require ("mongoose");

const url = process.env.MONGODB_URL

async function connectMongoDB(url) {
    return mongoose.connect(url)
}

module.exports = {
    connectMongoDB
}