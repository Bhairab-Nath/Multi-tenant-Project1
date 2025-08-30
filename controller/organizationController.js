const { QueryTypes } = require("sequelize")
const { sequelize, users } = require("../model")


exports.createOrganization = async(req,res,next)=>{
    const {name,address,email,number} = req.body
    const userId = req.userId
    const OrganizationNumber = Math.floor(1000 + Math.random()*9000)
    await sequelize.query(`CREATE TABLE IF NOT EXISTS organization_${OrganizationNumber}(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        address VARCHAR(255),
        email VARCHAR(255),
        number VARCHAR(255),
        userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
        
        )`,{
            type : QueryTypes.CREATE
    })

    const userData = await users.findByPk(userId)
    userData.currentOrganizationNumber = OrganizationNumber
    await userData.save()

    await sequelize.query(`CREATE TABLE IF NOT EXISTS userHistory_${userId}(
        organizationNumber INT
        
        )`,{
            type: QueryTypes.CREATE
    })

    await sequelize.query(`INSERT INTO organization_${OrganizationNumber}(name,address,email,number,userId) VALUES(?,?,?,?,?)`,{
        type : QueryTypes.INSERT,
        replacements : [name,address,email,number,userId]
    })

    await sequelize.query(`INSERT INTO userHistory_${userId}(organizationNumber) VALUES(?)`,{
        type: QueryTypes.INSERT,
        replacements: [OrganizationNumber]
    })

    req.userId = userId
    req.OrganizationNumber = OrganizationNumber
    next()

}

exports.createBlogTable = async(req,res)=>{
    const OrganizationNumber = req.OrganizationNumber
    await sequelize.query(`CREATE TABLE IF NOT EXISTS blog_${OrganizationNumber}(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        subtitle VARCHAR(255),
        description TEXT,
        createdBy INT REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
        
        )`,{
        type: QueryTypes.CREATE 
    })

    res.status(200).json({
        message: "User created successfully.",
        orgNo: OrganizationNumber
    })


}

exports.createBlog = async(req,res)=>{
    const {title,subtitle,description} = req.body
    const userId = req.userId
    const orgNo = req.currentOrganizationNumber
    if(orgNo === null || orgNo === undefined){
        return res.status(400).json({
            message: "There is no organization"
        })
    }
    await sequelize.query(`INSERT INTO blog_${orgNo}(title,subtitle,description,createdBy) VALUES(?,?,?,?)`,{
        type: QueryTypes.INSERT,
        replacements :[title,subtitle,description,userId]
    })

    res.status(200).json({
        message: "Blog added successfully"
    })
}

exports.deleteUser = async(req,res)=>{
const userId = req.userId

const userOrganizations = await sequelize.query(`SELECT organizationNumber FROM userHistory_${userId}`,{
    type: QueryTypes.SELECT
})

await sequelize.query(`DELETE FROM users WHERE id= ?`,{
    type: QueryTypes.DELETE,
    replacements: [userId]
})

for(var i = 0; i<userOrganizations.length; i++){
    await sequelize.query(`DROP TABLE organization_${userOrganizations[i].organizationNumber}`,{
        type: QueryTypes.RAW
    })
}

await sequelize.query(`DROP TABLE userHistory_${userId}`,{
    type: QueryTypes.RAW
})

res.status(200).json({
    message: "All organization deleted"
})


}