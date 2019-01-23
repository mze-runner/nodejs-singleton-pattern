'use strict';

// plain JSON 
const config = {
    dbs: {
        admin : {
            alias : 'admin', // optional field ...
            authentication: 'none',
            host:   '127.0.0.1',
            port:   '27017',
            db:     'app-admin',
            user: '',
            password: ''
        },
        app : {
            //alias : 'othername', // whether alias is missing property name used as an db alias....
            authentication: 'none',
            host:   '127.0.0.1',
            port:   '27017',
            db:     'app',
            user: '',
            password: ''
        }
    }
};

module.exports = module.exports.default = config;