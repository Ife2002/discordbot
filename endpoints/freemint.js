// 0x00000000000000adc04c56bf30ac9d3c0aaf14dc
// Alchemy key 9R5XwFiqIgFRekEmtEomNMQAPO7h1vZG
import { Alchemy, Network } from "alchemy-sdk";

 async function mintChecker(walletAddress, nftAddress){

  const config = {
    apiKey: "9R5XwFiqIgFRekEmtEomNMQAPO7h1vZG",
    network: Network.ETH_MAINNET,
  };
  const alchemy = new Alchemy(config);
  
  // Address we want get NFT mints from
  
  
  const res = await alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    fromAddress: "0x0000000000000000000000000000000000000000",
    toAddress: walletAddress,
    excludeZeroValue: true,
    category: ["erc721", "erc1155"],
  });
  
  // console.log(res.transfers)
  const contract721 = [];
  const contract1155 = [];
  
  res.transfers.forEach(item => {
    if (item.category === 'erc721') {
      const contractAddress = item.rawContract.address;
      const tokenIdDecimal = parseInt(item.tokenId, 16);
      const mintValue = item.value; // Assuming the value of the mint is provided in the response
      contract721.push({ contractAddress, tokenIdDecimal, mintValue });
    } else if (item.category === 'erc1155') {
      const contractAddress = item.rawContract.address;
      const tokenIdDecimal = parseInt(item.erc721TokenId, 16);
      const mintValue = item.value; // Assuming the value of the mint is provided in the response
      contract1155.push({ contractAddress, tokenIdDecimal, mintValue });
    }
  });
  
  // console.log('Contract721:', contract721);
  // console.log('Contract1155:', contract1155);
  
  
  function searchContract(nftAddress) {
    const foundInContract721 = contract721.find(item => item.contractAddress === nftAddress);
    const foundInContract1155 = contract1155.find(item => item.contractAddress === nftAddress);
  
    if (foundInContract721) {
      console.log(`Contract address ${nftAddress} found in contract721`);
     // console.log('Details:', foundInContract721);
      const mintValue = foundInContract721.mintValue
      return { found: true, category: 'ERC721', mintValue };
    } else if (foundInContract1155) {
      console.log(`Contract address ${nftAddress} found in contract1155`);
      // console.log('Details:', foundInContract1155);
      const mintValue = foundInContract1155.mintValue
      return { found: true, category: 'ERC1155', mintValue };
    } else {
      console.log(`Contract address ${nftAddress} not found.`);
      return { found: false };
    }
  }
  
  const result = searchContract(nftAddress);
  const valueCheck = result.mintValue || 0
  

  return {
    minted: result.found,
    type: result.category,
    value: valueCheck
  }


};

const nftAddress = "0xbb80f5ce5d443fa4fb971272841f6ebd7ab758f0"
const walletAddress = "0x4CBA834CA84dB941e8e794c3BAaA8736B66D5775"
const tokenId = "1123509012"


mintChecker(walletAddress, nftAddress)
    .then(result => {
      console.log(result.minted);
      console.log(result.type)
      console.log(result.value)
    })


// checkNFTMintingAndPrice(walletAddress)

// console.log(res)
