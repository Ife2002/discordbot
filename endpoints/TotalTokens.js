import { request } from 'undici';

const address = "0x0000c3Caa36E2d9A8CD5269C976eDe05018f0000"
const contractAddress = "0xcd77d8ca8c6d148060480fa11762630465211bf8"

export default async function getTotaltokens(Useraddress, nftAddress) {

  try{

    const {
      body
      }= await request(`https://api.modulenft.xyz/api/v2/eth/nft/collectionsOwned?address=${Useraddress}&count=10&offset=0&type=all&withMetadata=false`);
    const responseJSON = await body.json();
    const returned = responseJSON.data

    let result = returned.filter(collection => collection.collectionAddress == `${nftAddress}`)
    const totalTokensOwned = result[0]?.tokensOwned;
  //   console.log(result)
    // console.log(totalTokensOwned)
    // const response = getCollection(`${input}`)
      //    console.log(responseJSON)
      //    console.log(responseJSON.data.length)
        // const message = await body.text();
    // const result = message.slice(0, 180);
   return totalTokensOwned

  }catch(err){
    console.log(err)
  }
 
};

getTotaltokens(address, contractAddress)