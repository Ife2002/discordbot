import { request } from 'undici';

async function api(name){

const data = await request(`https://api.opensea.io/api/v1/collection/${name}`);
const { file } = await data.body.json();
console.log(file)
};

const newLocal = "valhalla";
api(newLocal);