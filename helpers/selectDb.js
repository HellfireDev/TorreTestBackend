
const selectDb = (dbUrl) => {
    if (dbUrl) {
        return {
            client: 'pg',
            connection: {
                connectionString: dbUrl,
                ssl: {
                    rejectUnauthorized: false
                }
            }
        };
    } else {
        return {
            client: 'pg',
            connection: {
                host: '127.0.0.1',
                user: 'postgres',
                password: 'blue',
                database: 'herosj'
            }
        };
    }
}

module.exports = { selectDb };