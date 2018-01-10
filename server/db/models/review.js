const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      // JM - try just the straight-up array
      len: {
        args: [20, 5000],
      }
    }
  },
  // JM - consider a methd to calculate avg rating
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }
})

module.exports = Review
