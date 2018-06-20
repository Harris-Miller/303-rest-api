'use strict';

const Sequelize = require('sequelize');

function article(sequelize) {
  return sequelize.define('article', {
    title: Sequelize.STRING,
    author: Sequelize.STRING,
    content: Sequelize.STRING
  });
}

module.exports = article;
