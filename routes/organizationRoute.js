const { createOrganization, deleteUser, createBlogTable } = require('../controller/organizationController')
const { isAuthenticated } = require('../middleware/isAuthenticated')

const router = require('express').Router()

router.route('/organization').post(isAuthenticated, createOrganization, createBlogTable)
router.route('/deleteuser').delete(isAuthenticated, deleteUser)

module.exports = router