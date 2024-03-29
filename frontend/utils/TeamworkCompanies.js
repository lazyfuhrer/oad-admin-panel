import axios from "axios";
import { MD5 } from "crypto-js";

const generateDigestHash = ( username, password, realm, method, uri, nonce, nc, cnonce,) => {
    const ha1 = MD5(`${username}:${realm}:${password}`);
    const ha2 = MD5(`${method}:${uri}`);
    const response = MD5(`${ha1}:${nonce}:${nc}:${cnonce}:auth:${ha2}`);
    return response.toString();
  };

  const username = 'admin';
  const password = 'Admin@123';
  const realm = 'REST API';
  const uri = 'https://apps.teamworkcss.com/oakwooduat/api/index/companies';
  const nonce = '63f5052db69f6';
  const nc = '00000001';
  const cnonce = Math.random().toString(36).substring(2);
  const method = 'GET';

  const config = {
    headers: {
      'x-api-key': '91bcec91-ddf0-402c-b287-a03d3563c320',
      Authorization: `Digest username="${username}", realm="${realm}", nonce="${nonce}", uri="${uri}", qop=auth, nc=${nc}, cnonce="${cnonce}", response="${generateDigestHash(
        username, password, realm, method, uri, nonce, nc, cnonce, )}"`,
    },
  };

export const teamworkCompanyGet = async () => {
    try {
        const response = await axios.get('https://apps.teamworkcss.com/oakwooduat/api/index/companies',config,);
        return response.data.data;
    } catch (error) {
        return error;
    }
};
