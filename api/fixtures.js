const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    await User.create({
        username: 'Manager1',
        password: 'manager1',
        token: nanoid(),
    }, {
        username: 'Manager2',
        password: 'manager2',
        token: nanoid(),
    });

    await mongoose.connection.close();
};

run().catch(console.error);
