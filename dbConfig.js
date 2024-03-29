const DB_LOCAL_CONFIG = {
    client: "pg",
    connection: {
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: "5432",
    },
}

const DB_DOCKER_CONFIG = {
    client: "pg",
    connection: {
        connectionString: process.env.POSTGRES_URI
    }
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
    DB_DOCKER_CONFIG,
    DB_DEPLOY_CONFIG
};