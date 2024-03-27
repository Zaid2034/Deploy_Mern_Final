const { Client } = require('pg');

async function getClient() {
    const client = new Client("postgres://dtykicba:7_xin8GudLXcx_UrM54Y2ZtYylgPcXlT@raja.db.elephantsql.com/dtykicba");
                               
    await client.connect();
    return client;
}
module.exports={getClient}