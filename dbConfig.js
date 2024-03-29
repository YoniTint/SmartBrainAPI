const DB_LOCAL_CONFIG = {
    client: "pg",
    connection: {
        host: "localhost",
        user: "postgres",
        password: "abcd1234",
        database: "brain",
        port: "5432",
    },
}

const DB_DEPLOY_CONFIG = {
    client: "pg",
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    },
}

module.exports = {
    DB_LOCAL_CONFIG,
    DB_DEPLOY_CONFIG
};