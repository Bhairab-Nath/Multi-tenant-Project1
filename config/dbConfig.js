module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "multiTenantProject",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };

