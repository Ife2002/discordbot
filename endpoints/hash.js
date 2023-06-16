import { request } from "undici";

export async function getTransactionData(transactionHash) {
  const etherscanApiKey = "8P4HSVBWRJ1C1B1KEVBF4QG94CXWF9J4PG";
  const etherscanUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${transactionHash}&apikey=${etherscanApiKey}`;

  try {
    // Query the Etherscan API
    const { body } = await request(etherscanUrl);
    const response = await body.json();
    const data = response;
    // console.log(data)

    const hexValue = `${data.result.value}`;
    const decimalValue = parseInt(hexValue, 16);
    const ETH = decimalValue / 1000000000000000000;

    // console.log('Transaction value in ETH:', ETH)

    return await ETH;
  } catch (error) {
    console.error("Failed to retrieve transaction data", error);
    return null;
  }
}

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
