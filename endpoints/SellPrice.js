import { request } from 'undici';

const address = "0x0000c3Caa36E2d9A8CD5269C976eDe05018f0000"
const contractAddress = "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85"

export default async function getSellPrice(Useraddress, nftAddress) {

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
    arr.push(obj[i].out_price_eth)
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

 getSellPrice(address, contractAddress)

// let max = responseJSON.data.length - 1;
//       let sumOne = responseJSON.data[0];
//       let sumTwo = responseJSON.data[max];
//       let priceOne = sumOne.out_price_eth
//       let priceTwo = sumTwo.out_price_eth
//       // Assuming that all the different series (heights, lengths, etc.) have the same two Date, Value attributes.
      
      
//       let sum = [priceOne, priceTwo]
//      // console.log(`price: ${priceTwo}`)
//     //  console.log(`sum : ${sum}`)

//       const initialValue = 0;
//       //sum of the two prices
//       const sumPrices = sum.reduce(
//         (accumulator, currentValue) => accumulator + currentValue,
//         initialValue
//       );

//      // console.log(`sumPrices : ${sumPrices}`)

//       //condition for potential bug when price two is null
//       function divisor(){
//         return (priceTwo == null? 1 : 2)
//       }
//      // console.log(divisor())
      
      
//       const sellPrice = sumPrices/divisor();

//       // console.log(`sellPrice: ${sellPrice}`)
      
    
   

       
//     //    console.log(responseJSON.data[0].in_price_eth)
//       //  console.log(responseJSON.data.length)
//       // const message = await body.text();
//   // const result = message.slice(0, 180);
//  return sellPrice