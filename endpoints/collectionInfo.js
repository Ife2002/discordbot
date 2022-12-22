import { request } from 'undici';


export default async function getCollectionInfo(input) {

  const { statusCode, body }= await request(`https://api.opensea.io/api/v1/collection/${input}`);
    //get api endpoint with erc adrress here
    //populate the adsress with the json
    //remove picture
    console.log('response received', statusCode)
  const response = await body.json();
  
//   console.log(response)
  return response   
  
  
 
};

// getCollectionInfo(`valhalla`)