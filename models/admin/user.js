'use strict';

const database = require('../../mongodb').get('admin');
const Schema = require('mongoose').Schema;

const adminUserSchema = Schema({
  username: { type: String, required: true },
  email : { type: String, unique : true, required : true },
  password : { type : String, required: true },
  scope : [ { type: String} ]
});

database.model('user', adminUserSchema);