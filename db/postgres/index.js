'use strict';

const Sequelize = require('sequelize');
const articleFactory = require('./models/article');

let article;

// the assumption is that this option adheres to an interface
const postgres = {
  connect() {
    // new Sequelize('database', 'username', 'password', config)
    const sequelize = new Sequelize('blog', 'postgres', null, {
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    });

    article = articleFactory(sequelize);

    return sequelize.sync();
  },

  article: {
    create({ author, title, content }) {
      return article.create({
        author,
        title,
        content
      });
    },
    read({ id } = { id: null }) {
      const query = {};
      let queryType;

      if (id) {
        query.where = { id };
        queryType = 'findOne';
      } else {
        queryType = 'findAll';
      }

      return article[queryType](query);
    },
    update(id, obj) {
      return article.update(obj, { where: { id }});
    },
    delete(id) {
      return article.destory({ where: { id }});
    }
  },

  _seed() {
    // drop articles table and seed new data
    return article.destroy({ where: {}, truncate: true })
      .then(() => {
        return article.bulkCreate([{
          author: 'Harris Miller',
          title: 'Applying to 303 Software',
          content: 'I hope I get this job!'
        }, {
          author: 'John Doe',
          title: 'Who am I?',
          content: 'Spoilers, I have no idea'
        }])
      });
  }
}

module.exports = postgres;
