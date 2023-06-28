import { Alchemy, Network, NftFilters, NftSaleMarketplace } from "alchemy-sdk";

const config = {
    apiKey: "9R5XwFiqIgFRekEmtEomNMQAPO7h1vZG",
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

const main = async () => {

    //contract address
    const address = "0xbb80f5ce5d443fa4fb971272841f6ebd7ab758f0";

    // Get floor price
    const price = await alchemy.nft.getFloorPrice(address);
    console.log(price);

    // Get sales history of BAYC #1000
    const history = await alchemy.nft.getNftSales({
      fromBlock: 0,
      toBlock: 'latest',
      marketplace: NftSaleMarketplace.SEAPORT,
      contractAddress: address,
      tokenId: 4871,
  })

  console.log(history);

};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();

//  getSellPrice(address, contractAddress)

// let max = responseJSON.data.length - 1;
// let sumOne = responseJSON.data[0];
// let sumTwo = responseJSON.data[max];
// let priceOne = sumOne?.in_price_eth
// let priceTwo = sumTwo?.in_price_eth
