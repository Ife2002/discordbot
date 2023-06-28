// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "9R5XwFiqIgFRekEmtEomNMQAPO7h1vZG",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

// Address we want get NFT mints from
const fromAddress = "0x4CBA834CA84dB941e8e794c3BAaA8736B66D5775";

const res = await alchemy.core.getAssetTransfers({
  fromBlock: "0x0",
  fromAddress: fromAddress,
  excludeZeroValue: true,
  category: ["erc721", "erc1155"],
});

// Print contract address and tokenId for each NFT (ERC721 or ERC1155):
for (const events of res.transfers) {
    if (events.rawContract.address === '0xbb80f5ce5d443fa4fb971272841f6ebd7ab758f0') {
      if (events.erc1155Metadata == null) {
        console.log(
          "ERC-721 Token Minted: ID- ",
          events,
          " Contract- ",
          events.rawContract.address
        );
      } else {
        for (const erc1155 of events.erc1155Metadata) {
          console.log(
            "ERC-1155 Token Minted: ID- ",
            erc1155.tokenId,
            " Contract- ",
            events.rawContract.address
          );
        }
      }
    }
  }

  
  
  
  
  
  
  