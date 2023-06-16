import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

const runApp = async () => {
  await Moralis.start({
    apiKey: "ug868qYxVG9o60i75Q1dbBA1NyO4QoN73oktCoOdv3M1b6Tnjc3X3pDgiW18e85N",
    // ...and any other configuration
  });

  const address = "0x00000000000000adc04c56bf30ac9d3c0aaf14dc";
  const tokenId = "8887"
  const chain = EvmChain.ETHEREUM;

  const response = await Moralis.EvmApi.nft.getNFTContractTransfers({
    address,
    chain,
  });

  console.log(response.toJSON());

  const json = response.toJSON
  const transactions = Object.values(json);

  
  const addressToFilter = '0xfb60292a30a87fb1b4da9ad8c9a6ce21f325e8bb'; // The address to filter
  
  const filteredTransactions = transactions.filter(transaction => transaction.from_address === addressToFilter);
  
  console.log( "transact" + filteredTransactions);
};

runApp();