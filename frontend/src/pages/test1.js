import { useState, useEffect } from 'react';
import md5 from 'md5';

async function getData() {
  const username = 'admin';
  const password = 'Admin@123';
  const realm = 'oakwooduat';
  const method = 'GET';
  const uri = '/api/index/companies';
  const nonce = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const cnonce = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const nc = '00000001';
  const qop = 'auth';
  const digest = md5(`${username}:${realm}:${password}`) + `:${nonce}:${nc}:${cnonce}:${qop}:${md5(`${method}:${uri}`)}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Digest username="${username}", realm="${realm}", nonce="${nonce}", uri="${uri}", qop="${qop}", nc="${nc}", cnonce="${cnonce}", response="${digest}"`,
      'Content-Type': 'application/json',
      'x-api-key': '91bcec91-ddf0-402c-b287-a03d3563c320'
    }
  };
  const response = await fetch('https://apps.teamworkcss.com/oakwooduat/api/index/companies', requestOptions);
  const data = await response.json();
  return data;
}

export default function MyPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData();
        console.log(data)
        setData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Companies</h1>
    </div>
  );
}
