const router = require('express').Router()

const adminRoute = require('./admin')

router.use('/admin', adminRoute)

module.exports = router