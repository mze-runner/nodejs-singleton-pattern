'use strict';

const mongoose = require('mongoose');
const debug = require('debug')('mongndb:config');

// get or create global unique symbol name ... 
const GLOBAL_DBS_KEY = Symbol.for("app.dbs");

// validate db config input whether everything in place, list of must have keys...
const dbConfigMustHave = 'authentication host port db user password';

// check if the global object has this symbol
// add it if it does not have the symbol, yet
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasDbs = (globalSymbols.indexOf(GLOBAL_DBS_KEY) > -1);

// init global object if not yet done...
if(!hasDbs){
    global[GLOBAL_DBS_KEY] = {};
}

// helper function... simply build connection string.
const _buildConnectionString = function ( { host, port, db, authentication, user, password } ) {
    return authentication === 'password' 
    ? `mongodb://${user}:${password}@${host}:${port}/${db}`
    : `mongodb://${host}:${port}/${db}`;
};

// helper function to validate whether all values in place to setup a connection. 
const _validate = (must, input) => {
    const mustArray = must.split(/ /);
    const errors = [];
    mustArray.forEach(element => {
        if(!input.hasOwnProperty(element)){
            errors.push(element);
        }
    });
    return errors;
}

const _getConnection = ({ alias, host, port, db, authentication, user, password}) => {

    const connString = _buildConnectionString( { host, port, db, authentication, user, password } );

    const conn = mongoose.createConnection(connString, { useNewUrlParser: true }, (err) => {
        if(err) {
            debug('INSTANCE SHUTDOWN: DB %s CONNECT ERROR: %s' , alias, err.message);
            process.exit(1);// close node instance...
        }
    })

    conn.on('error', (err) => {
        debug('DB %s(%s) connection fail with %s', alias, host, err.message);
        process.exit(1);// close node instance...
    });

    conn.once('connected', () => {
        debug('db connection to %s(%s/%s) established!', alias, host,db);
    });

    conn.once('open', function() {
        debug('db connection to %s(%s/%s) open...', alias, host, db);
    });

    conn.once('close', function() {
        debug('db connection to %s(%s) closed...', alias, host);
        process.exit(1);
    });
    
    process.on('exit', (code) => {
        conn.close(function () {
            // same as close // /remove from bds list ....
            debug('Mongoose default connection disconnected through app termination');
        });
    });
    return conn;
}

// define the singleton API
var singleton = {};

singleton.init = function(dbs){
    if(typeof dbs !== 'object'){
        throw new Error('Dbs list is not an object...');
    }
    for(var db in dbs){
        if(dbs.hasOwnProperty(db) ){
            // expect following list of input per db
            // alias, authentication, host, port, db, user, password
            const err = _validate(dbConfigMustHave, dbs[db]);
            if(err.length){
                throw new Error('Invalid DB config object...');
            }
            const { alias } = dbs[db];
            // if alias if not provided we take property name
            const globalAlias = alias || db;
            // create connection to a db fomr the list
            const openConnection = _getConnection(dbs[db]);
            // save instance of the connection to global
            global[GLOBAL_DBS_KEY][globalAlias] = openConnection;
        }
    }
}

singleton.get = function(alias){
    if(!global[GLOBAL_DBS_KEY] || !global[GLOBAL_DBS_KEY][alias]){
        throw new Error('Database not found...');
    }
    return global[GLOBAL_DBS_KEY][alias];
}

// ensure the API is never changed
Object.freeze(singleton);

// export the singleton API only, 
// everything else behind the scene...
module.exports = singleton;