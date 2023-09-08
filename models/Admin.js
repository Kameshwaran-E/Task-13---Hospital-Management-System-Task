const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const adminSchema = new mongoose.Schema({
    email: {
        unique: true,
        type: String
    },
    passport: {
        type: String,
    }
})

adminSchema.plugin(passportLocalMongoose)

const Admin = mongoose.model("admins", adminSchema)

module.exports = Admin