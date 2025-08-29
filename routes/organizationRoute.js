const { createOrganization } = require('../controller/organizationController')
const { isAuthenticated } = require('../middleware/isAuthenticated')

const router = require('express').Router()

router.route('/organization').post(isAuthenticated, createOrganization)

module.exports = router