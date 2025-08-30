const { createOrganization, deleteUser, createBlogTable, createBlog } = require('../controller/organizationController')
const { isAuthenticated } = require('../middleware/isAuthenticated')

const router = require('express').Router()

router.route('/organization').post(isAuthenticated, createOrganization, createBlogTable)
router.route('/deleteuser').delete(isAuthenticated, deleteUser)
router.route('/createblog').post(isAuthenticated, createBlog)

module.exports = router