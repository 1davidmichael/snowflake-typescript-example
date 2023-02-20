"use strict";
exports.__esModule = true;
var snowflake = require("snowflake-sdk");
var connection = snowflake.createConnection({
    account: process.env.SNOWFLAKE_ACCOUNT,
    username: process.env.SNOWFLAKE_USER,
    privateKeyPath: process.env.SNOWFLAKE_PRIVATE_KEY_PATH,
    privateKeyPass: "",
    region: process.env.SNOWFLAKE_REGION,
    authenticator: 'SNOWFLAKE_JWT'
});
var query = process.env.SNOWFLAKE_QUERY;
connection.connect(function (err, conn) {
    if (err) {
        console.error('Unable to connect: ' + err.message);
    }
    else {
        console.log('Successfully connected as ID: ' + connection.getId());
    }
});
var output;
var response = connection.execute({
    sqlText: query,
    complete: function (err, stmt, rows) {
        if (err) {
            console.error('Failed to execute statement due to the following error: ' + err.message);
        }
        else {
            output = rows;
            return output;
        }
    }
});
var stream = response.streamRows();
console.log(stream.on('data', function (row) {
    console.log(row);
}));
