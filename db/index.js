/*
$ su - postgres
$ psql template1
template1=# CREATE USER tester WITH PASSWORD 'test_password';
template1=# GRANT ALL PRIVILEGES ON DATABASE "test_database" to tester;
template1=# \q


CREATE TABLE users (
    user_id bigserial primary key,
    user_name text NULL,
    user_email text NOT NULL,
    user_password text NOT NULL,
    user_avatar text NULL,

    date_added timestamp default NULL
);

CREATE TABLE tokens (
    token_id bigserial primary key,
    user_email text NULL,
    token_access text NOT NULL,
    token_refresh text NOT NULL
);
 */

import pkg from 'pg';
const {Pool} = pkg;

import { config } from 'dotenv';

config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_BASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

const query = async (text, params, callback) => {
    return pool.query(text, params, callback);
};

export { query };