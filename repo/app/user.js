

const db = require('../../models').app;
const { Types } = require('mongoose');

const repoUser = {};

// very simple, return all user records from admin database...
repoUser.list = ()=> db.user.find({}).exec();

module.exports = repoUser;