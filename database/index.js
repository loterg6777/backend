const mongoose = require('mongoose');

const connect = () => {
    const url = process.env.MONGO_URL
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    mongoose.connect(url, options)
}

module.exports = {
    connect
}