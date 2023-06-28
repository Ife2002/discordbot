import { request } from "undici";
import axios from "axios";


export async function getTransactionData() {
  const apiKey = 'ea1b7233061742b88f7307d095049381';
  const input = 'foxpal';

  try {

    const apiUrl = `https://api.opensea.io/api/v1/collection/${input}`
    const { body } = await request(apiUrl, {
      headers: {
        "X-API-KEY": apiKey,
      },
    });

    const responseJSON = await body.json();
    const response = responseJSON;

    console.log(response)

    
  } catch (error) {
    console.error("Failed to retrieve transaction data", error);
    return null;
  }
};


// Example usage
// const transactionHash = '0x513c1ba0bebf66436b5fed86ab668452b7805593c05073eb2d51d3a52f480a76';
// getTransactionData(transactionHash)
//   .then(data => {
//     if (data !== null) {
//         const hexValue = `${data.result.value}`;
//         const decimalValue = parseInt(hexValue, 16);
//         const ETH = decimalValue/1000000000000000000

//         console.log('Transaction value in ETH:', ETH);
//     } else {
//       console.log('Failed to retrieve transaction data');
//     }
//   })
//   .catch(error => {
//     console.error('Failed to retrieve transaction data', error);
//   });
