import * as snowflake from 'snowflake-sdk';

const connection = snowflake.createConnection({
    account: process.env.SNOWFLAKE_ACCOUNT!,
    username: process.env.SNOWFLAKE_USER!,
    privateKeyPath: process.env.SNOWFLAKE_PRIVATE_KEY_PATH,
    privateKeyPass: "",
    region: process.env.SNOWFLAKE_REGION,
    authenticator: 'SNOWFLAKE_JWT'
})

const query = process.env.SNOWFLAKE_QUERY!;

connection.connect((err, conn) => {
    if (err) {
        console.error('Unable to connect: ' + err.message);
    } else {
        console.log('Successfully connected as ID: ' + connection.getId());
    }
});

let output!: any[];
const response = connection.execute({
    sqlText: query,
    complete: (err, stmt, rows) => {
        if (err) {
            console.error('Failed to execute statement due to the following error: ' + err.message);
        } else {
            output = rows!
            return output as any[];
        }
    }
});
const stream = response.streamRows();

console.log(stream.on('data', (row) => {
    console.log(row);
}));
