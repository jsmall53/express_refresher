import Datastore from 'nedb';

const users_db = new Datastore()

users_db.ensureIndex({ fieldName: 'email', unique: true });

export default users_db;
