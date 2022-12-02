import { request } from 'undici';


export default async function getUrl(url) {

  const { body } = await request(url);
  
  const avatar = await body.arrayBuffer();
  
  return avatar      
 
};