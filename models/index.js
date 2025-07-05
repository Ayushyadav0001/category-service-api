// File: models/index.js
require('dotenv').config()
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
)

const User = require('./user.model')(sequelize)
const Category = require('./category.model')(sequelize)
const Service = require('./service.model')(sequelize)
const PriceOption = require('./priceOption.model')(sequelize)

// Define relations
Category.hasMany(Service, { foreignKey: 'categoryId', onDelete: 'CASCADE' })
Service.belongsTo(Category, { foreignKey: 'categoryId' })

Service.hasMany(PriceOption, { foreignKey: 'serviceId', onDelete: 'CASCADE' })
PriceOption.belongsTo(Service, { foreignKey: 'serviceId' })

module.exports = { sequelize, User, Category, Service, PriceOption }
