import { request } from 'undici';

async function getWalletTrades(walletAddress, collectionSlug) {
  try {
    const apiKey = "ea1b7233061742b88f7307d095049381";
    const apiUrl = `https://api.opensea.io/api/v1/events?account_address=${walletAddress}&collection_slug=${collectionSlug}&event_type=successful`;

    const { body } = await request(apiUrl, {
      headers: {
        'X-API-KEY': apiKey
      }
    });
    const responseJSON = await body.json();
    const response = responseJSON
    console.log(response.asset_events[2])
    const trades = response.data.asset_events;
    const tradeResults = [];

    for (const trade of trades) {
      const buyTransaction = trade.transaction;
      const buyPrice = parseFloat(buyTransaction.total_price) / Math.pow(10, buyTransaction.payment_token.decimals);
      const sellTransaction = trade.transaction.to_account;
      const sellPrice = parseFloat(sellTransaction.total_price) / Math.pow(10, sellTransaction.payment_token.decimals);

      const result = {
        tokenId: trade.asset.token_id,
        buyPrice,
        sellPrice,
        profitLoss: sellPrice - buyPrice
      };

      tradeResults.push(result);
    }

    return tradeResults;
  } catch (error) {
    console.error('Error retrieving wallet trades:', error);
    return [];
  }
}

// Example usage
const walletAddress = "0x4CBA834CA84dB941e8e794c3BAaA8736B66D5775";
const collectionSlug = "foxpal";

getWalletTrades(walletAddress, collectionSlug)
  .then(trades => {
    console.log('Wallet trades:');
    for (const trade of trades) {
      console.log(`Token ID: ${trade.tokenId}`);
      console.log(`Buy Price: ${trade.buyPrice}`);
      console.log(`Sell Price: ${trade.sellPrice}`);
      console.log(`Profit/Loss: ${trade.profitLoss > 0 ? 'Profit' : 'Loss'}`);
      console.log('---');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
