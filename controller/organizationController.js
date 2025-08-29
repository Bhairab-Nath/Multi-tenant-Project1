const { QueryTypes } = require("sequelize")
const { sequelize } = require("../model")


exports.createOrganization = async(req,res)=>{
    const {name,address,email,number} = req.body
    const userId = req.userId
    const OrganizationNumber = Math.floor(1000 + Math.random()*9000)
    await sequelize.query(`CREATE TABLE organization_${OrganizationNumber}(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        address VARCHAR(255),
        email VARCHAR(255),
        number VARCHAR(255),
        userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
        
        )`,{
            type : QueryTypes.CREATE
    })

    await sequelize.query(`INSERT INTO organization_${OrganizationNumber}(name,address,email,number,userId) VALUES(?,?,?,?,?)`,{
        type : QueryTypes.INSERT,
        replacements : [name,address,email,number,userId]
    })

    res.status(200).json({
            message: "Organization Created successfully.",
            orgNo: OrganizationNumber
    })

}