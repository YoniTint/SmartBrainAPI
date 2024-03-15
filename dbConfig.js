export const DB_LOCAL_CONFIG = {
    client: "pg",
    connection: {
        host: "localhost",
        user: "postgres",
        password: "abcd1234",
        database: "brain",
        port: "5432",
    },
}

export const DB_DEPLOY_CONFIG = {
    client: "pg",
    connection: {
        host: process.env.DATABASE_URL,
        ssl: true
    },
}