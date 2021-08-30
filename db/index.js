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
    date_added timestamp default NULL
);
 */

import pkg from 'pg';
const {Pool} = pkg;

const pool = new Pool({
    user: 'd1mpi',
    host: 'localhost',
    database: 'base',
    password: 'add76caf',
    port: 5432,
});

const query = async (text, params, callback) => {
    return pool.query(text, params, callback);
};

export { query, pool };