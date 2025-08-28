const { createOrganization } = require('../controller/organizationController')

const router = require('express').Router()

router.route('/organization').post(createOrganization)

module.exports = router