const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`mongodb connected ${mongoose.connection.host}`)
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = connectDB