'use strict';

const database = require('../../mongodb').get('app');
const Schema = require('mongoose').Schema;

const appUserSchema = Schema({
  username: { type: String, required: true },
  email : { type: String, unique : true, required : true },
  password : { type : String, required: true },
  enable : { type : Boolean, default : true },
});



database.model('user', appUserSchema);