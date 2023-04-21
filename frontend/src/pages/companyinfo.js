import CompanyInfoCard from '@/components/CompanyInfoCard'
import { Box, Stack } from '@chakra-ui/react'
import axios from 'axios';
import { MD5 } from 'crypto-js';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react'

export default function CompanyInfo() {
  const router = useRouter();
  const [data, setData] = useState([]);

  const generateDigestHash = (
    username,
    password,
    realm,
    method,
    uri,
    nonce,
    nc,
    cnonce,
  ) => {
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
        username,
        password,
        realm,
        method,
        uri,
        nonce,
        nc,
        cnonce,
      )}"`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://apps.teamworkcss.com/oakwooduat/api/index/companies',
          config,
        );
        //console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);
  
  /*useEffect(() => {
    if (data.length > 0) {
      console.log(data);
    }
  }, [data]);*/

  const companyId = router.query.id;
  console.log(companyId)
  useEffect(() => {
    if (typeof id === 'undefined') {
      router.replace('/companyinfo?id=0');
    }
  }, []);

  return (
    <>
      {data.length > 0 && (
        <Stack spacing={'2'} mb={'1'}>
            <Box mb={'5'} >
              <CompanyInfoCard field={"UEN"} value={""} />
              <CompanyInfoCard field={"COMPANY NAME"} value={data[companyId].entity_name} />
              <CompanyInfoCard field={"INCORPORATION DATE"} value={data[companyId].incorporation_date} />
              <CompanyInfoCard field={"COMPANY TYPE"} value={""} />
              <CompanyInfoCard field={"PRINCIPAL ACTIVITY 1"} value={""} />
              <CompanyInfoCard field={"PRINCIPAL ACTIVITY 2"} value={""} />
              <CompanyInfoCard field={"REGISTERED OFFICE ADDRESS"} value={data[companyId].registred_office_address} />
              <CompanyInfoCard field={"FINANCIAL YEAR END"} value={""} />
              <CompanyInfoCard field={"DATE OF LAST AGM"} value={""} />
              <CompanyInfoCard field={"WEBSITE"} value={""} />
            </Box>
        </Stack>
      )}
    </>
  );
}