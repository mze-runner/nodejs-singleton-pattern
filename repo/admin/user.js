

const db = require('../../models').admin;
const { Types } = require('mongoose');

const repoUser = {};

// very simple, return all user records from admin database...
repoUser.list = ()=> db.user.find({}).exec();

repoUser.get = (adminId) =>{
    const id = Types.ObjectId(adminId);
    return db.user.findOne({ _id : id }).exec();
}
module.exports = repoUser;