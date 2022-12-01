import { request } from 'undici';

// const address = "0xbD4f2B8A461E82E5c488193f84A9206DE820fAB1"
// const contractAddress = "0xa4991609c508b6d4fb7156426db0bd49fe298bd8"

export default async function getMinted(Useraddress, nftAddress) {

  const {
    body
    }= await request(`https://api.modulenft.xyz/api/v2/eth/nft/userHistory?address=${Useraddress}&contractAddress=${nftAddress}&count=100&offset=0&withMetadata=false&in_type=all&out_type=all`);
  const responseJSON = await body.json();
  const number = responseJSON.data.length
  const length = number
  
  const response = responseJSON
  const obj = responseJSON.data
  const arr = []

  for(var i = 0; i < length; i++) {
    arr.push(obj[i].in_price_eth)
  }
  const initialValue = 0;
      //sum of the two prices
      const sumPrices = arr.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      );
 const meanPrice = sumPrices/length
  // console.log(arr)
  // console.log(`totalPrice: ${sumPrices}`)
  
  console.log(meanPrice)
  //x is equal to in_price
  
  return meanPrice 
      
 
};


//  getMinted(address, contractAddress)
