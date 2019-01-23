'user strict';

const admin = require('../mongodb').get('admin');

const app = require('../mongodb').get('app');

module.exports.admin = {
    user : admin.model('user'),
    audit : admin.model('audit'),
}

module.exports.app = {
    user : app.model('user'),
}