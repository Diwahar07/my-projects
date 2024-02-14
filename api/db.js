import mysql from 'mysql2';

export const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:'diwahar18703',
    database:"blog"
});

