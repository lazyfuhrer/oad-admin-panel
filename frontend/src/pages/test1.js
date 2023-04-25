import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { MD5 } from 'crypto-js';

export default function Test() {

  const generateDigestHash = ( username, password, realm, method, uri, nonce, nc, cnonce, ) => {
    const ha1 = MD5(`${username}:${realm}:${password}`);
    const ha2 = MD5(`${method}:${uri}`);
    const response = MD5(`${ha1}:${nonce}:${nc}:${cnonce}:auth:${ha2}`);
    return response.toString();
  };

  const username = 'admin';
  const password = 'Admin@123';
  const realm = 'REST API';
  const endpoint = 'https://apps.teamworkcss.com/oakwooduat/api/index/add_company';
  const nonce = '63f5052db69f6';
  const nc = '00000001';
  const cnonce = Math.random().toString(36).substring(2);
  const method = 'POST';

  const addCompany = async () => {
    const formData = new FormData();
    formData.append('country', 'India');
  
    try {
      const response = await axios.post(
        endpoint,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-api-key': '91bcec91-ddf0-402c-b287-a03d3563c320',
            Authorization: `Digest username="${username}", realm="${realm}", nonce="${nonce}", uri="${endpoint}", qop=auth, nc=${nc}, cnonce="${cnonce}", response="${generateDigestHash(
              username,
              password,
              realm,
              method,
              endpoint,
              nonce,
              nc,
              cnonce,
            )}"`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }  
  return (
    <>
      <Button colorScheme={'blue'} onClick={addCompany}>Add Data</Button>
    </>
  );
};