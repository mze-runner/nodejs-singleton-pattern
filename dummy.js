
const crypto = require('crypto');


// create dummy data to work with for testing purpose... 

//const databaseAdmin = require('./mongodb').get('admin');

const dbs = require('./models')

const _createRandomPassword = (len) =>{
    const buf = crypto.randomBytes(len);
    return buf.toString('hex')
}

const createAdminDummyUser = async () => {

    const dummyData = [
        {"_id":"5c48b0d71b83315564b6aacb","username":"admin.user0","email":"test.user0@com.com","password":"f0a2b4b5ba6d989d64d3e55e","scope":["profile"]},
        {"_id":"5c48b0d71b83315564b6aacd","username":"admin.user1","email":"test.user1@com.com","password":"a706932c8d29bde1278e6113","scope":[""]},
        {"_id":"5c48b0d71b83315564b6aacf","username":"admin.user2","email":"test.user2@com.com","password":"8c2f57fb04d9d599536c2cf0","scope":["view"]},
        {"_id":"5c48b0d71b83315564b6aad1","username":"admin.user3","email":"test.user3@com.com","password":"f34459bf48c9a736f3157722","scope":["profile_edit"]},
        {"_id":"5c48b0d71b83315564b6aad3","username":"admin.user4","email":"test.user4@com.com","password":"5c351fec76338db4b2c69b7c","scope":["profile", "somethingelse"]},
        {"_id":"5c48b0d71b83315564b6aad5","username":"admin.user5","email":"test.user5@com.com","password":"a47879f8b80c6caa92c94336","scope":["profile", "morerights"]},
        {"_id":"5c48b0d71b83315564b6aad7","username":"admin.user6","email":"test.user6@com.com","password":"d00791c8722d3c29a06fd03e","scope":["profile", "etc"]},
        {"_id":"5c48b0d71b83315564b6aadb","username":"admin.user8","email":"test.user8@com.com","password":"5b362debc594908f19e3e124","scope":[""]},
        {"_id":"5c48b0d71b83315564b6aad9","username":"admin.user7","email":"test.user7@com.com","password":"198aa6a982a817e8d2151c7b","scope":["profile"]},
    ];

    dummyData.forEach(async element => {
        const { _id, username, email, password, scope} = element;
        let query  = { _id };
        let newData = { username, email, password, scope };
        const options = { new: false, upsert: true };
        await dbs.admin.user.findOneAndUpdate(query, newData, options).exec();
    });
}

const createAppDummyUser = async () => {

    for(let i = 0; i < 10; i++){
        const username = `app.user${i.toString()}`;
        const email = `app.user${i.toString()}@com.com`;
        const password = _createRandomPassword(12);

        const query  = { username };
        const newData = { email, password };
        const options = { new: false, upsert: true };
        await dbs.app.user.findOneAndUpdate(query, newData, options).exec();
    }
}

createAdminDummyUser();
createAppDummyUser();




