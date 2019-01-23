'use strict';

const database = require('../../mongodb').get('admin');
const Schema = require('mongoose').Schema;

const auditSchema = Schema({
  _admin: { type: Schema.Types.ObjectId, ref : 'user' },
  action: { type : String }
}, { timestamp : true });

database.model('audit', auditSchema);