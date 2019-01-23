'use strict';

const db = require('../../models').admin;

const repoAudit = {};

repoAudit.record = ({ admin, action}) => {
    const query  = { };
    const newData = { _admin : admin, action  };
    const options = { new: true, upsert: true };
    return db.audit.findOneAndUpdate(query, newData, options).exec();
};

module.exports = repoAudit;
