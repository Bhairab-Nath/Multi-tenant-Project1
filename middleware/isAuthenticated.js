const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const { users } = require('../model')

exports.isAuthenticated = async (req,res,next)=>{
    const token = req.cookies.token
    // console.log(token)
    if(!token || token === null || token === undefined){
        return res.status(401).json({
            message: "Please provide token or login"
        })
    }

    const verifiedResult = await promisify(jwt.verify)(token,process.env.secretKey)
    const user = await users.findByPk(verifiedResult.id)
    if(!user){
        return res.status(404).json({
            message: "User doesn't exist"
        })
    }

    req.userId = verifiedResult.id
    req.currentOrganizationNumber = user.currentOrganizationNumber
    next()

}