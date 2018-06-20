'use strict';

const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const db = require('../db');

router.route('/articles').get((req, res, next) => {
  db.article.read()
    .then(articles => res.json(articles))
    .catch(err => next(createError.InternalServerError(err)));
});

router.route('/articles').post((req, res, next) => {
  if (req.body.id) {
    return next(createError.Conflict('Client-side created ids are not supported'));
  }

  const { author, title, content } = req.body;

  if (!author) {
    return next(createError.BadRequest('author property is required'));
  }

  if (!title) {
    return next(createError.BadRequest('title property is required'));
  }

  if (!content) {
    return next(createError.BadRequest('content property is required'));
  }

  return db.article.create({ author, title, content })
    .then(newArticle => {
      res.status(201);
      res.json(newArticle);
    })
    .catch(err => next(createError.InternalServerError(err)));
});

router.route('/articles/:id').get((req, res, next) => {
  db.article.read({ id: req.params.id })
    .then(article => {
      if (!article) {
        return next(createError.NotFound());
      }

      return res.json(article);
    })
    .catch(err => next(createError.InternalServerError(err)));
});

router.route('/articles/:id').patch((req, res, next) => {
  db.article.update(req.params.id, req.body)
    .then(() => {
      res.status(200);
      res.end();
    })
    .catch(err => next(createError.InternalServerError(err)));
});

router.route('/articles/:id').delete((req, res, next) => {
  db.article.delete(req.params.id)
    .then(() => {
      res.status(204);
      res.end();
    })
    .catch(err => next(createError.InternalServerError(err)));
});

module.exports = router;
