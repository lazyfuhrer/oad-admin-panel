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
    formData.append('css-client', '1');
    formData.append('entity_name', 'NewTest');
    formData.append('former_name_if_any', 'OldTest');
    formData.append('company_id', '47');
    formData.append('entity_type', '2');
    formData.append('registration_no', '478');
    formData.append('acra_uen', '4789');
    formData.append('country', 'India');
    formData.append('risk_assessment_rating', '2');
    formData.append('incorporation_date', '30/04/2023');
    formData.append('website', 'https://github.com/lazyfuhrer');
    formData.append('default_address', '0');
    formData.append('block_0', 'M');
    formData.append('street_name_0', '7th st.');
    formData.append('building_0', 'GreenWoods');
    formData.append('level_0', '3');
    formData.append('unit_no_0', '17');
    formData.append('country_0', 'India');
    formData.append('state_0', 'West Bengal');
    formData.append('city_0', 'Kolkata');
    formData.append('postal_code_0', '700120');

  
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