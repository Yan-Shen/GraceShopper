const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  // JM - not ideal :)
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },

})

module.exports = Category
