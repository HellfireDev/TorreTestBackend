const knex = require('knex');

//Create a local PostgreSQL DB
const base_db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'blue',
        database: 'postgres',
        charset: 'utf8'
    }
});

const dbName = 'herosj';

const createDb = () => {
    return new Promise((resolve, reject) => {
        base_db.raw(`CREATE DATABASE ${dbName};`)
            .then(() => resolve('DB successfuly created!'))
            .catch(reject);
    })
};

const createTables = () => {
    return new Promise((resolve, reject) => {
        const herosjDb = knex({
            client: 'pg',
            connection: {
                host: '127.0.0.1',
                user: 'postgres',
                password: 'blue',
                database: `${dbName}`,
                charset: 'utf8'
            }
        });

        herosjDb.schema.createTable('login', table => {
            table.increments('loginid').primary();
            table.string('hash', 100).notNullable();
            table.string('torreid', 100).notNullable().unique();
        }).then(console.log('Login table successfully created!')
        ).catch(error => {
            base_db.raw(`DROP DATABASE ${dbName};`);
            reject(error);
        });

        herosjDb.schema.createTable('users', table => {
            table.increments('id').primary();
            table.string('name', 100).notNullable();
            table.string('torreid', 50).notNullable().unique();
        }).then(()=>resolve('Users table successfully created!')
        ).catch(error => {
            base_db.raw(`DROP DATABASE ${dbName};`);
            reject(error);
        });

    })
};


const runScript = async () => {
    try {
        const runCreateDb = await createDb();
        console.log(runCreateDb);
        const runCreateTables = await createTables();
        console.log(runCreateTables);
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runScript();