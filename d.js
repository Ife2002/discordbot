import { request } from 'undici';


async function execute(input) {

  const {
    body
    }= await request(`https://api.modulenft.xyz/api/v2/eth/nft/sales?count=1&offset=0&sortDirection=timeDesc&slug=${input}&withMetadata=false`);
  const responseJSON = await body.json();
  // const response = getCollection(`${input}`)
       console.log(responseJSON)
       console.log(responseJSON.data.length)
      // const message = await body.text();
  // const result = message.slice(0, 180);
 
};

execute('valhalla')
