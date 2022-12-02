import { request } from 'undici';

// const address = "0x0000c3Caa36E2d9A8CD5269C976eDe05018f0000"
// const contractAddress = "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85"

export default async function getBuyCost(Useraddress, nftAddress) {

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
  
  // console.log(length)
  //x is equal to in_price
  
  return sumPrices   
      
 
};

//  getSellPrice(address, contractAddress)

// let max = responseJSON.data.length - 1;
// let sumOne = responseJSON.data[0];
// let sumTwo = responseJSON.data[max];
// let priceOne = sumOne?.in_price_eth
// let priceTwo = sumTwo?.in_price_eth