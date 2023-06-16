import { request } from "undici";
import { getTransactionData } from "./hash.js";

export default async function getWalletTrades(walletAddress, collectionSlug) {
  try {
    const apiKey = "ea1b7233061742b88f7307d095049381";
    const apiUrl = `https://api.opensea.io/api/v1/events?account_address=${walletAddress}&collection_slug=${collectionSlug}&event_type=successful`;

    const { body } = await request(apiUrl, {
      headers: {
        "X-API-KEY": apiKey,
      },
    });

    const responseJSON = await body.json();
    const response = responseJSON;
    console.log(response.asset_events)
    const time = response.asset_events[0].transaction.timestamp;

    // Empty arrays to store the extracted data

    const walletTrades = [];

    // Loop through the response array and extract the token IDs and timestamps
    for (let i = 0; i < response.asset_events.length; i++) {
      // console.log(response.asset_events[0].transaction.timestamp)
      const item = response.asset_events[i];
      const tokenId = item.asset.token_id;

      const timestamp = item.transaction.timestamp;
      const date = new Date(time);
      const unixTimestamp = Math.floor(date.getTime() / 1000);

      const hash = item.transaction.transaction_hash;
      const Ethvalue = await getTransactionData(hash);
      const event = item.event_type
      const price = item.total_price / 1000000000000000000
     // console.log(event, price)

      // Push the token ID and timestamp into their respective arrays
      // tokenIds.push(tokenId);
      walletTrades.push({
        tokenID: tokenId,
        timeStamp: timestamp,
        ETHValue: price,
      });
    }

    // Output the arrays
    // console.log('Token IDs:', tokenIds);
    // console.log("walletTrades:", walletTrades);
    const uniqueTokenIDs = new Set(walletTrades.map((trade) => trade.tokenID));
    const numberOfUniqueTokenIDs = uniqueTokenIDs.size;
    
   // console.log(numberOfUniqueTokenIDs);

    
    const mintChecker = walletTrades.length / numberOfUniqueTokenIDs;
    console.log(mintChecker)

    if( mintChecker === 2 ){

    } else {

    }
    
    // This fuction fliters all the purchases trades from the wallet trades
    const BuyTrades = [];
    const uniqueBuyTokenIDs = [
      ...new Set(walletTrades.map((trade) => trade.tokenID)),
    ];

    uniqueBuyTokenIDs.forEach((tokenID) => {
      const tradesWithTokenID = walletTrades.filter(
        (trade) => trade.tokenID === tokenID
      );
      const earliestTrade = tradesWithTokenID.reduce((earliest, current) => {
        if (current.timeStamp < earliest.timeStamp) {
          return current;
        }
        return earliest;
      });

      BuyTrades.push(earliestTrade);
    });

   // console.log("NfT Purchases :" + JSON.stringify(BuyTrades));

    const buyEthValues = BuyTrades.map((trade) => trade.ETHValue);
    const buySum = buyEthValues.reduce((total, value) => total + value, 0);
    const buyMean = buySum / buyEthValues.length;

   // console.log("Buy price:" + buyMean);

     // This fuction fliters all the sales from the wallet trades
     const SellTrades = [];
     const uniqueSellTokenIDs = [
       ...new Set(walletTrades.map((trade) => trade.tokenID)),
     ];
 
     uniqueSellTokenIDs.forEach((tokenID) => {
       const tradesWithTokenID = walletTrades.filter(
         (trade) => trade.tokenID === tokenID
       );
       const earliestTrade = tradesWithTokenID.reduce((earliest, current) => {
         if (current.timeStamp > earliest.timeStamp) {
           return current;
         }
         return earliest;
       });
 
       SellTrades.push(earliestTrade);
     });
 
    console.log("NfT Sales :" + JSON.stringify(SellTrades));
 
     const sellEthValues = SellTrades.map((trade) => trade.ETHValue);
     const sellSum = sellEthValues.reduce((total, value) => total + value, 0);
     const sellMean = sellSum / sellEthValues.length;

    
    const mintSell = []
    mintSell.push(walletTrades)
    console.log(JSON.stringify(mintSell))
    //use the values of the array above instead w conditionals using mintchecker as dterminant
 
    // console.log("Sell price:" + sellMean);
    function calculatePercentageProfit(buyPrice, sellPrice) {
      const profit = sellPrice - buyPrice;
      const percentageProfit = (profit / buyPrice) * 100;
      const percentage2Dec = percentageProfit.toFixed(2)
      return percentage2Dec;
    }

    // Free mint handler
    

    const profitPercentage = calculatePercentageProfit(buyMean, sellMean);

    const remaining = BuyTrades.length - SellTrades.length

    return{
      entry: `${buyMean}`,
      exit: `${sellMean}`,
      traded: `${SellTrades.length}`,
      profitpercent: profitPercentage,
      remaining: `${remaining}`
    };
  } catch (error) {
    console.error("Error retrieving wallet trades:", error);
    return [];
  }
}

// Example usage fuekinft
const walletAddress = "0x4CBA834CA84dB941e8e794c3BAaA8736B66D5775";
const collectionSlug = "fuekinft";

getWalletTrades(walletAddress, collectionSlug)

async function getTransactionPrice(transactionHash) {
  const etherscanApiKey = "8P4HSVBWRJ1C1B1KEVBF4QG94CXWF9J4PG";
  const etherscanUrl = `https://https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=0x513c1ba0bebf66436b5fed86ab668452b7805593c05073eb2d51d3a52f480a76&apikey=${etherscanApiKey}`;

  try {
    // Query the Etherscan API
    const response = await request(etherscanUrl);
    const data = response.data;
    console.log("data:" + data);

    // Check if the API request was successful
    if (data.status === "1") {
      // Retrieve the transaction details
      const result = data.result;
      const valueWei = parseInt(result.value, 16);
      const valueEth = valueWei / 10 ** 18; // Convert from Wei to Ether
      return valueEth;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to retrieve transaction price", error);
    return null;
  }
}

const transactionHash =
  "0xc6d341cdd95a6db5d363023bc0ff63759c7cac6c3ed48c90c3a634e97b1fa6ae";

const { entry, exit, traded, profitpercent, remaining } = await getWalletTrades(walletAddress, collectionSlug)
// console.log(entry);
// console.log(exit);
// console.log(traded);
// console.log(profitpercent)
// console.log(remaining)
