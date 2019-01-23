const router = require('express').Router();
const repo = require('../repo');
const debug = require('debug')('controller');

// regular expression to validate mongodb IDs
const refrenceIdRegExp24 = new RegExp(/^[0-9a-fA-F]{24}$/);
/**
 * Validate ID (mongodb ID) reference
 */
const validatReferenceId = (str) => !refrenceIdRegExp24.test(str) ? false : true; // validate mongo reference ID.

// welcome message
router.get('/api', (req, res) => {
    res.send('I am a showcase server on how to arrange a connection to multiple mongodb servers using singleton pattern...');
})

// get all auser from admin database
router.get('/api/admins', async (req, res, next) => {
    try{
        const adminList = await repo.admin.user.list();
        res.send(adminList);
    }catch(err){
        next(err);
    }
});

// get admin details
router.get('/api/admins/:adminId', async (req, res, next) => {
    try{
        const { adminId } = req.params;
        debug('ADMIN ID: %s', adminId);
        if(!validatReferenceId(adminId)){
            throw new Error('Invalid admin id...');
        }
        const admin = await repo.admin.user.get(adminId);
        if(!admin){
            throw new Error('Admin not found...');
        }
        res.send(admin);
    }catch(err){
        next(err);
    }
});

// make a request to app database to grab all users
// and make a record into audit collection upon event.
router.get('/api/admins/:adminId/users', async (req, res, next) => {
    try{
        const { adminId } = req.params;
        if(!validatReferenceId(adminId)){
            throw new Error('Invalid admin id...');
        }
        const admin = await repo.admin.user.get(adminId);
        if(!admin){
            throw new Error('Admin not found...');
        }
        // now we have admin record in hands
        // onwards we can checkout whether admin has right for further request
        // I skip any extra logic...
        const userList = await repo.app.user.list();
        // now request can be audited
        const audit = await repo.admin.audit.record({admin, action : 'request for list of app users' });
        // for testing purpose, let's consol log audit mongoose object.
        debug('AUDIT RECORD: %O', audit);
        res.send(userList);
    }catch(err){
        next(err);
    }
});

module.exports = router;