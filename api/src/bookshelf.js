var knexJs = require('knex');
var bookshelfJs = require('bookshelf');

var config = require('../knexfile');

var knex = knexJs(config);
var bookshelf = bookshelfJs(knex);

module.exports = bookshelf;
