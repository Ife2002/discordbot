import { request } from 'undici';

 const address = "0x0000c3Caa36E2d9A8CD5269C976eDe05018f0000"
 const contractAddress = "0xe373db56b558a7d9dd6090124f0857c8d622a427"

export default async function getTokenStats(Useraddress, nftAddress) {
  try{

    const {
      body
      }= await request(`https://api.modulenft.xyz/api/v2/eth/nft/userStats?address=${Useraddress}&contractAddress=${nftAddress}`);
    const responseJSON = await body.json();
    const result = await responseJSON.data
    // const response = getCollection(`${input}`)
        // console.log(responseJSON)
        // console.log(responseJSON.data.length);
        // console.log(result)
        // const message = await body.text();
    // const result = message.slice(0, 180);

    return Promise.resolve(result);

  } catch (err){
    console.log(err)
  }

 
};

 getTokenStats(address, contractAddress)