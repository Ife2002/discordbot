import { request } from 'undici';

// const address = "0xbD4f2B8A461E82E5c488193f84A9206DE820fAB1"
// const contractAddress = "0xa4991609c508b6d4fb7156426db0bd49fe298bd8"

export default async function getRemainder(Useraddress, nftaddress) {

  const {
  body
  }= await request( `https://api.modulenft.xyz/api/v2/eth/nft/owned?address=${Useraddress}&count=100&offset=0&type=all&withMetadata=false&contractAddress=${nftaddress}`);
    
   
  const responseJSON = await body.json();
  const response = responseJSON
  const obj = responseJSON.totalCount
  
  console.log(obj)
  return obj
};
// getRemainder("0x0000c3Caa36E2d9A8CD5269C976eDe05018f0000", "0x82cb9d20862641301c987f0b096086d32bc11b65")