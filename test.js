const { request } = require('undici');



async function find (collection) {
    const Result = await request(`https://api.opensea.io/api/v1/collection/${collection}`);
    const  file  = await Result.body.json();
    console.log(file)
};

find("valhalla");