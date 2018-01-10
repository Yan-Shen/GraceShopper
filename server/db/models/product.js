const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
    // JM - what about notEmpty?
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: "https://i.pinimg.com/736x/91/5d/43/915d4345e49c0cdafa82cdfcf7ed9967.jpg"
  },
  // JM - use integer. 1.99 => 199, you can always convert this to a decimal using a getter method
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
    // JM - notEmpty?
  },
  inventoryCount: {
    // JM - validations? -ve?
    type: Sequelize.INTEGER,
    allowNull: false
  },
  size: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = Product

