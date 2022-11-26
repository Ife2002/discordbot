// import axios from 'axios';
import { request } from 'undici';
// import fetch from 'node-fetch';
import { Buffer } from 'node:buffer';


const getCollection = async (name, req, res) => {
  try {
    const {
      statusCode,
      headers,
      trailers,
      body
    }= await request(`https://api.opensea.io/api/v1/collection/${name}`);
    const response = await body.json();
    console.log(res)
    console.log(req)
    console.log('response received', statusCode)
    console.log('data', await body.json())
    return response;
    
  } catch (error) {
    // res.status(500).json({ message: 'Something went wrong.' });
    console.log(error.message);
  }
};

export default getCollection;
