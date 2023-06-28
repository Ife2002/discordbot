import axios from 'axios';

const Auth = Buffer.from(
  "56c8e981ce7940a0a77bffa425d56ed9" + ":" + "211ffcb33b4949cd9a8915df4894e80e",
).toString("base64");

const chainId = 1;
const walletAddress = "0x4CBA834CA84dB941e8e794c3BAaA8736B66D5775";
const toBlock = 17579107;

(async () => {
  try {
    const { data } = await axios.get(
      `https://nft.api.infura.io/networks/${chainId}/accounts/${walletAddress}/assets/transfers`,
      {
        headers: {
          Authorization: `Basic ${Auth}`,
        },
      },
    );

    const response = Object.values(data)


    const filteredResponse = response[5].filter(obj => obj.transactionHash === '0x9084043a7c986c7101354a50c1ffaf0d980517f9042dc9f900e3d13df68706ec');
    
    console.log(":rocket: ~ file: index.js:20 ~ result:", filteredResponse);
  } catch (error) {
    console.log(":rocket: ~ file: index.js:17 ~ error:", error);
  }
})();

  
  
  
  