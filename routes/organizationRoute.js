const { createOrganization, deleteUser } = require('../controller/organizationController')
const { isAuthenticated } = require('../middleware/isAuthenticated')

const router = require('express').Router()

router.route('/organization').post(isAuthenticated, createOrganization)
router.route('/deleteuser').delete(isAuthenticated, deleteUser)

module.exports = router