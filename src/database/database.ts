import { DatabaseError } from "../error/database.error";

const environment = process.env.ENVIRONMENT || 'development'
const config = require('./knexfile')[environment];

const db = require('knex')(config);

const default_value = require('./default.database');

(async () => {
    //Insert all default role
    for (let i = 0; i < default_value.default_value_role.length; i++) {
        const role = default_value.default_value_role[i];
        try {
            const new_role = await db('roles').insert(role).returning('id');
            if (role) {
                console.log(`Inserted role ${new_role.name} with id ${new_role.id}`);
            }
        }catch (e) {
            console.log(`${role.name}:`, DatabaseError[e.errno].message);
        }
    }
})();

export default db;



